(function () {
  'use strict';

  var API_URL = (window.RENERGENCE_CONFIG && window.RENERGENCE_CONFIG.apiUrl) || '/api/navigate';
  var MAX_EXCHANGES = 5;
  var OPENING_MESSAGE =
    'This is a collection of books and tools \u2014 not a course. There\u2019s no right order, and you don\u2019t need to read everything. It\u2019s designed to be coherent as a whole, and usable in parts.\n\nTell me what\u2019s going on and I\u2019ll point you to where it starts.';
  var FALLBACK_MESSAGE =
    'I\u2019m having trouble connecting right now. You can email support@renergence.com and we\u2019ll help you find the right starting point.';

  var messages = [];
  var exchangeCount = 0;
  var isOpen = false;
  var isLoading = false;
  var triggerElement = null;

  function createWidget() {
    // Floating button
    var btn = document.createElement('button');
    btn.id = 'nav-widget-btn';
    btn.setAttribute('aria-label', 'Open navigator — not sure where to start?');
    btn.innerHTML =
      '<span class="nav-widget-btn-label">Not sure where to start?</span>';
    btn.addEventListener('click', togglePanel);

    // Chat panel
    var panel = document.createElement('div');
    panel.id = 'nav-widget-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'nav-widget-dialog-title');
    panel.innerHTML =
      '<div class="nav-widget-header">' +
      '<span class="nav-widget-title" id="nav-widget-dialog-title">Navigator</span>' +
      '<button class="nav-widget-close" aria-label="Close navigator">&times;</button>' +
      '</div>' +
      '<div class="nav-widget-messages" id="nav-widget-messages" role="log" aria-live="polite" aria-label="Conversation"></div>' +
      '<div class="nav-widget-input-row">' +
      '<label for="nav-widget-input" class="sr-only">Describe what you\u2019re dealing with</label>' +
      '<textarea id="nav-widget-input" placeholder="Describe what you\u2019re dealing with\u2026" rows="2"></textarea>' +
      '<button id="nav-widget-send" aria-label="Send message">&#8594;</button>' +
      '</div>';

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    panel.querySelector('.nav-widget-close').addEventListener('click', togglePanel);
    document.getElementById('nav-widget-send').addEventListener('click', sendMessage);
    document.getElementById('nav-widget-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Escape key closes dialog
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        togglePanel();
      }
      // Focus trap: Tab within dialog
      if (e.key === 'Tab') {
        var focusable = panel.querySelectorAll('button, textarea, a, [tabindex]:not([tabindex="-1"])');
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  }

  function togglePanel() {
    isOpen = !isOpen;
    var panel = document.getElementById('nav-widget-panel');
    var btn = document.getElementById('nav-widget-btn');

    if (isOpen) {
      triggerElement = document.activeElement;
      panel.classList.add('nav-widget-open');
      btn.classList.add('nav-widget-btn-hidden');
      if (messages.length === 0) {
        appendMessage('assistant', OPENING_MESSAGE);
      }
      document.getElementById('nav-widget-input').focus();
    } else {
      panel.classList.remove('nav-widget-open');
      btn.classList.remove('nav-widget-btn-hidden');
      // Restore focus to trigger element
      if (triggerElement && triggerElement.focus) {
        triggerElement.focus();
      }
    }
  }

  function appendMessage(role, text) {
    var container = document.getElementById('nav-widget-messages');
    var div = document.createElement('div');
    div.className = 'nav-widget-msg nav-widget-msg-' + role;

    // Convert download links and basic markdown in assistant messages
    var html = escapeHtml(text);
    html = html.replace(
      /\[Download (.+?) →\]/g,
      '<a href="index.html#get-books" class="nav-widget-book-link">Download $1 \u2192</a>'
    );
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
    html = html.replace(/\n/g, '<br>');
    div.innerHTML = html;

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function showLoading() {
    var container = document.getElementById('nav-widget-messages');
    var div = document.createElement('div');
    div.className = 'nav-widget-msg nav-widget-msg-assistant nav-widget-loading';
    div.id = 'nav-widget-loading';
    div.setAttribute('aria-label', 'Thinking');
    div.innerHTML = '<span class="nav-widget-dots"><span>.</span><span>.</span><span>.</span></span>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function removeLoading() {
    var el = document.getElementById('nav-widget-loading');
    if (el) el.remove();
  }

  function sendMessage() {
    if (isLoading) return;

    var input = document.getElementById('nav-widget-input');
    var text = input.value.trim();
    if (!text) return;

    input.value = '';
    appendMessage('user', text);
    messages.push({ role: 'user', content: text });
    exchangeCount++;

    isLoading = true;
    showLoading();
    document.getElementById('nav-widget-send').disabled = true;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error('API error: ' + res.status);
        return res.json();
      })
      .then(function (data) {
        removeLoading();
        var reply = data.reply || FALLBACK_MESSAGE;
        appendMessage('assistant', reply);
        messages.push({ role: 'assistant', content: reply });
      })
      .catch(function () {
        removeLoading();
        appendMessage('assistant', FALLBACK_MESSAGE);
      })
      .finally(function () {
        isLoading = false;
        document.getElementById('nav-widget-send').disabled = false;
        document.getElementById('nav-widget-input').focus();
      });
  }

  function injectStyles() {
    var css =
      '#nav-widget-btn {' +
      '  position: fixed; bottom: 24px; right: 24px; z-index: 9999;' +
      '  background: var(--site-action-bg, #2563eb); color: white;' +
      '  border: none; border-radius: 28px; padding: 0.75rem 1.25rem;' +
      '  font-size: 0.9375rem; font-weight: 500; cursor: pointer;' +
      '  box-shadow: 0 4px 12px rgba(0,0,0,0.15);' +
      '  transition: transform 0.2s, opacity 0.2s, box-shadow 0.2s;' +
      '  font-family: var(--font-body, system-ui, sans-serif);' +
      '}' +
      '#nav-widget-btn:hover {' +
      '  transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.2);' +
      '}' +
      '#nav-widget-btn.nav-widget-btn-hidden {' +
      '  opacity: 0; pointer-events: none; transform: translateY(10px);' +
      '}' +
      '#nav-widget-panel {' +
      '  position: fixed; bottom: 24px; right: 24px; z-index: 10000;' +
      '  width: 380px; max-height: 520px; background: white;' +
      '  border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.18);' +
      '  display: flex; flex-direction: column;' +
      '  opacity: 0; pointer-events: none; transform: translateY(20px);' +
      '  transition: opacity 0.25s, transform 0.25s;' +
      '  font-family: var(--font-body, system-ui, sans-serif);' +
      '}' +
      '#nav-widget-panel.nav-widget-open {' +
      '  opacity: 1; pointer-events: auto; transform: translateY(0);' +
      '}' +
      '.nav-widget-header {' +
      '  display: flex; justify-content: space-between; align-items: center;' +
      '  padding: 0.875rem 1rem; border-bottom: 1px solid #e5e7eb;' +
      '}' +
      '.nav-widget-title {' +
      '  font-size: 0.9375rem; font-weight: 600; color: #111;' +
      '}' +
      '.nav-widget-close {' +
      '  background: none; border: none; font-size: 1.375rem; color: #666;' +
      '  cursor: pointer; padding: 0 4px; line-height: 1;' +
      '}' +
      '.nav-widget-close:hover { color: #111; }' +
      '.nav-widget-messages {' +
      '  flex: 1; overflow-y: auto; padding: 1rem;' +
      '  display: flex; flex-direction: column; gap: 0.75rem;' +
      '  min-height: 280px; max-height: 360px;' +
      '}' +
      '.nav-widget-msg {' +
      '  font-size: 0.875rem; line-height: 1.5; padding: 0.625rem 0.875rem;' +
      '  border-radius: 10px; max-width: 88%;' +
      '}' +
      '.nav-widget-msg-assistant {' +
      '  background: #f3f4f6; color: #111; align-self: flex-start;' +
      '  border-bottom-left-radius: 4px;' +
      '}' +
      '.nav-widget-msg-user {' +
      '  background: var(--site-action-bg, #2563eb); color: white;' +
      '  align-self: flex-end; border-bottom-right-radius: 4px;' +
      '}' +
      '.nav-widget-book-link {' +
      '  display: inline-block; margin-top: 0.5rem; color: var(--site-action-bg, #2563eb);' +
      '  text-decoration: none; font-weight: 500;' +
      '}' +
      '.nav-widget-book-link:hover { text-decoration: underline; }' +
      '.nav-widget-input-row {' +
      '  display: flex; gap: 0.5rem; padding: 0.75rem 1rem;' +
      '  border-top: 1px solid #e5e7eb;' +
      '}' +
      '#nav-widget-input {' +
      '  flex: 1; border: 1px solid #d1d5db; border-radius: 8px;' +
      '  padding: 0.5rem 0.75rem; font-size: 0.875rem; resize: none;' +
      '  font-family: var(--font-body, system-ui, sans-serif);' +
      '  line-height: 1.4;' +
      '}' +
      '#nav-widget-input:focus { outline: 2px solid var(--site-accent, #EA2264); outline-offset: 1px; border-color: var(--site-action-bg, #2563eb); }' +
      '#nav-widget-send {' +
      '  background: var(--site-action-bg, #2563eb); color: white;' +
      '  border: none; border-radius: 8px; width: 2.5rem;' +
      '  font-size: 1.125rem; cursor: pointer; flex-shrink: 0;' +
      '}' +
      '#nav-widget-send:hover { background: var(--site-action-hover, #1d4ed8); }' +
      '#nav-widget-send:disabled { opacity: 0.5; cursor: not-allowed; }' +
      '.nav-widget-dots span {' +
      '  animation: navDotPulse 1.2s infinite;' +
      '  font-size: 1.25rem; line-height: 1;' +
      '}' +
      '.nav-widget-dots span:nth-child(2) { animation-delay: 0.2s; }' +
      '.nav-widget-dots span:nth-child(3) { animation-delay: 0.4s; }' +
      '@keyframes navDotPulse {' +
      '  0%, 60%, 100% { opacity: 0.3; }' +
      '  30% { opacity: 1; }' +
      '}' +
      '@media (max-width: 480px) {' +
      '  #nav-widget-panel {' +
      '    width: calc(100vw - 16px); right: 8px; bottom: 8px;' +
      '    max-height: calc(100vh - 80px); border-radius: 10px;' +
      '  }' +
      '  #nav-widget-btn { bottom: 16px; right: 16px; }' +
      '}';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    injectStyles();
    createWidget();
  }
})();
