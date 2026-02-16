// Universal header for all pages
document.addEventListener('DOMContentLoaded', function() {
    const pathname = window.location.pathname;
    const currentPage = pathname.split('/').pop() || 'index.html';

    // Detect if we're in a subdirectory (like /books/ or /training/)
    const inSubdir = pathname.includes('/books/') || pathname.includes('/training/');
    const pathPrefix = inSubdir ? '../' : '';

    // Favicon injection (single source for all pages)
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = (inSubdir ? '../' : '') + 'images/favicon.svg';
    document.head.appendChild(favicon);

    // Skip link (accessibility: first focusable element)
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertAdjacentElement('afterbegin', skipLink);

    const headerHTML = `
        <nav class="nav" aria-label="Main navigation">
            <div class="nav-container">
                <div class="logo"><a href="${pathPrefix}index.html">Renergence<sup style="font-size:0.45em;vertical-align:super;opacity:0.6;">&trade;</sup></a></div>
                <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-links">
                    <li><a href="${pathPrefix}index.html" ${currentPage === 'index.html' ? 'class="active"' : ''}>Home</a></li>
                    <li><a href="${pathPrefix}how-it-works.html" ${currentPage === 'how-it-works.html' ? 'class="active"' : ''}>How It Works</a></li>
                    <li><a href="${pathPrefix}products.html" ${currentPage === 'products.html' ? 'class="active"' : ''}>Products</a></li>
                    <li><a href="${pathPrefix}training.html" ${currentPage === 'training.html' || pathname.includes('/training/') ? 'class="active"' : ''}>Training</a></li>
                    <li><a href="${pathPrefix}about.html" ${currentPage === 'about.html' ? 'class="active"' : ''}>About</a></li>
                </ul>
            </div>
        </nav>
    `;

    // Insert header after skip link
    skipLink.insertAdjacentHTML('afterend', headerHTML);

    // Add id="main-content" to first <main> or first content section
    var main = document.querySelector('main') || document.querySelector('.hero') || document.querySelector('.page-header') || document.querySelector('section');
    if (main && !document.getElementById('main-content')) {
        main.id = 'main-content';
    }

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    function closeMenu() {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    navToggle.addEventListener('click', function() {
        var isExpanded = navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', String(isExpanded));
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
            navToggle.focus();
        }
    });
});
