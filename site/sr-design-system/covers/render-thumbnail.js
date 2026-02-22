#!/usr/bin/env node
/**
 * render-thumbnail.js — Render a 600x600 Gumroad square thumbnail from a cover HTML template
 *
 * Usage:
 *   node render-thumbnail.js cover-bottleneck-trap.html
 *   node render-thumbnail.js cover-bottleneck-trap.html --output /tmp
 *   node render-thumbnail.js all --output /tmp
 *
 * This does NOT just scale the cover. It builds a thumbnail-native layout:
 *   - 600x600 square, thread background
 *   - Bookmark tab flush top-right corner
 *   - Mark, title, subtitle, author — all resized for thumbnail readability
 *
 * Output filename: <book-name>-thumb.jpg
 *
 * Requirements:
 *   npm install puppeteer-core (in /tmp or globally)
 *   Google Chrome installed at default macOS path
 */

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const THUMB_SIZE = 600;

const THREAD_BACKGROUNDS = {
  'thread-renergence': '#0D1164',
  'thread-hnr': '#640D5F',
  'thread-engagement': '#EA2264',
  'thread-mn': '#F78D60'
};

const THREAD_ACCENTS = {
  'bm-renergence': '#4A6FFF',
  'bm-hnr': '#C466BB',
  'bm-engagement': '#FF5A8A',
  'bm-mn': '#FFB088'
};

const args = process.argv.slice(2);
const outputFlag = args.indexOf('--output');
const outputDir = outputFlag !== -1 ? args[outputFlag + 1] : __dirname;
const inputArg = args.find(a => !a.startsWith('--') && (outputFlag === -1 || a !== args[outputFlag + 1]));

if (!inputArg) {
  console.error('Usage: node render-thumbnail.js <cover-file.html|all> [--output DIR]');
  process.exit(1);
}

const coverDir = __dirname;

let htmlFiles;
if (inputArg === 'all') {
  htmlFiles = fs.readdirSync(coverDir).filter(f => f.startsWith('cover-') && f.endsWith('.html') && !f.includes('_thumb-temp'));
} else {
  htmlFiles = [inputArg];
}

function extractFromHtml(html) {
  // Thread background
  let bgColor = '#1a1a1a';
  for (const [cls, color] of Object.entries(THREAD_BACKGROUNDS)) {
    if (html.includes(cls)) { bgColor = color; break; }
  }

  // Bookmark accent color
  let bmAccent = '#C466BB';
  for (const [cls, color] of Object.entries(THREAD_ACCENTS)) {
    if (html.includes(cls)) { bmAccent = color; break; }
  }

  // Bookmark label text
  const bmMatch = html.match(/<span class="bookmark-label">(.*?)<\/span>/);
  const bmLabel = bmMatch ? bmMatch[1] : '';

  // Bookmark tier class (for width)
  const isInstrument = html.includes('bm-instrument');
  const isDepth = html.includes('bm-depth');
  const isGateway = html.includes('bm-gateway');

  // SVG mark
  const svgMatch = html.match(/<svg[\s\S]*?<\/svg>/);
  const svg = svgMatch ? svgMatch[0] : '';

  // Title — get text content and inline style
  const titleMatch = html.match(/<div class="cover-title"[^>]*>([\s\S]*?)<\/div>/);
  const titleHtml = titleMatch ? titleMatch[1].trim() : '';

  // Subtitle
  const subMatch = html.match(/<div class="cover-subtitle">([\s\S]*?)<\/div>/);
  // Strip <br> tags so subtitle renders on one line in thumbnail
  const subtitleHtml = subMatch ? subMatch[1].trim().replace(/<br\s*\/?>/gi, ' ') : '';

  return { bgColor, bmAccent, bmLabel, isInstrument, isDepth, isGateway, svg, titleHtml, subtitleHtml };
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox']
  });

  for (const htmlFile of htmlFiles) {
    const htmlPath = path.resolve(coverDir, htmlFile);
    if (!fs.existsSync(htmlPath)) {
      console.error(`File not found: ${htmlPath}`);
      continue;
    }

    const baseName = htmlFile.replace('cover-', '').replace('.html', '');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    const d = extractFromHtml(htmlContent);

    // Bookmark — substantial, fills top-right corner
    let bmWidth = d.isInstrument ? 52 : d.isDepth ? 44 : d.isGateway ? 24 : 44;
    let bmHeight = 320;

    const thumbHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${THUMB_SIZE}px;
    height: ${THUMB_SIZE}px;
    background: ${d.bgColor};
    position: relative;
    overflow: hidden;
  }

  /* Bookmark — flush top-right */
  .bm {
    position: absolute;
    top: 0;
    right: 0;
    width: ${bmWidth}px;
    height: ${bmHeight}px;
    background: ${d.bmAccent};
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 3px solid rgba(255,255,255,0.12);
    border-left: 1px solid rgba(255,255,255,0.06);
    ${d.isGateway ? 'opacity: 0.6; border-bottom: none;' : ''}
  }
  .bm-label {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: ${d.isInstrument ? '15px' : '14px'};
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.95);
    white-space: nowrap;
    ${d.isGateway ? 'display: none;' : ''}
  }

  /* Content — spread across full canvas */
  .content {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 55px 40px 45px 40px;
  }

  /* Mark */
  .mark {
    opacity: 0.80;
  }
  .mark svg {
    width: 130px;
    height: 130px;
  }
  .mark svg line, .mark svg circle, .mark svg path, .mark svg polyline, .mark svg polygon, .mark svg rect, .mark svg ellipse {
    stroke: rgba(255,255,255,0.35);
    fill: none;
  }
  .mark svg .mark-fill-hnr, .mark svg .mark-fill-renergence, .mark svg .mark-fill-engagement, .mark svg .mark-fill-mn {
    fill: rgba(255,255,255,0.35);
    stroke: none;
  }

  /* Title */
  .title {
    font-family: 'Libre Baskerville', serif;
    font-weight: 700;
    font-size: 44px;
    line-height: 1.15;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #ffffff;
    text-align: center;
  }

  /* Subtitle */
  .subtitle {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 300;
    font-size: 22px;
    line-height: 1.5;
    letter-spacing: 0.015em;
    color: rgba(255,255,255,0.85);
    text-align: center;
    margin-top: 4px;
  }

  /* Author */
  .author {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.7);
    text-align: center;
    margin-top: 0;
  }
</style>
</head>
<body>
  <div class="bm"><span class="bm-label">${d.bmLabel}</span></div>
  <div class="content">
    <div class="mark">${d.svg}</div>
    <div class="title">${d.titleHtml}</div>
    <div class="subtitle">${d.subtitleHtml}</div>
    <div class="author">Steven Rudolph</div>
  </div>
</body>
</html>`;

    const tmpHtmlPath = path.join(coverDir, `_thumb-temp-${baseName}.html`);
    fs.writeFileSync(tmpHtmlPath, thumbHtml);

    const page = await browser.newPage();
    await page.setViewport({ width: THUMB_SIZE, height: THUMB_SIZE, deviceScaleFactor: 1 });
    await page.goto(`file://${tmpHtmlPath}`, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.evaluateHandle('document.fonts.ready');

    const jpgPath = path.join(outputDir, `${baseName}-thumb.jpg`);
    await page.screenshot({ path: jpgPath, type: 'jpeg', quality: 95, clip: { x: 0, y: 0, width: THUMB_SIZE, height: THUMB_SIZE } });

    fs.unlinkSync(tmpHtmlPath);

    const size = (fs.statSync(jpgPath).size / 1024).toFixed(0);
    console.log(`✓ ${baseName}-thumb.jpg (${size}KB)`);
    await page.close();
  }

  await browser.close();
  console.log('Done.');
})();
