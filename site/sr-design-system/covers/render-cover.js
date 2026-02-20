#!/usr/bin/env node
/**
 * render-cover.js — Render any book cover HTML template to hi-res PNG + JPG
 *
 * Usage:
 *   node render-cover.js cover-why-you-thrive.html
 *   node render-cover.js cover-heroes-not-required.html --output ~/Desktop
 *   node render-cover.js cover-why-you-thrive.html --scale 16
 *
 * Requirements:
 *   npm install puppeteer-core   (in /tmp or globally)
 *   Google Chrome installed at default macOS path
 *
 * What it does:
 *   1. Launches headless Chrome
 *   2. Loads the cover HTML template (with Google Fonts via networkidle0)
 *   3. Waits for fonts to fully load (document.fonts.ready)
 *   4. Screenshots the .cover element at deviceScaleFactor
 *   5. Saves PNG (lossless) and JPG (quality 100, no chroma subsampling, 500KB+)
 *
 * Output filenames:  <cover-name>-hires.png, <cover-name>-hires.jpg
 */

const puppeteer = require('puppeteer-core');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const htmlFile = args.find(a => a.endsWith('.html'));
const scaleFlag = args.indexOf('--scale');
const outputFlag = args.indexOf('--output');

if (!htmlFile) {
  console.error('Usage: node render-cover.js <cover-file.html> [--output DIR] [--scale N]');
  console.error('Example: node render-cover.js cover-why-you-thrive.html');
  process.exit(1);
}

const scale = scaleFlag !== -1 ? parseInt(args[scaleFlag + 1]) : 16;
const outputDir = outputFlag !== -1 ? args[outputFlag + 1] : null;
const coverDir = __dirname;
const htmlPath = path.resolve(coverDir, htmlFile);
const baseName = htmlFile.replace('cover-', '').replace('.html', '');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  // Cover is 175x262 CSS px. Body has 40px padding on all sides.
  await page.setViewport({
    width: 175 + 80,
    height: 262 + 80,
    deviceScaleFactor: scale
  });

  const fileUrl = `file://${htmlPath}`;
  console.log(`Loading: ${fileUrl}`);
  console.log(`Scale: ${scale}x → ${175 * scale}x${262 * scale} pixels`);

  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 15000 });
  await page.evaluateHandle('document.fonts.ready');

  const coverEl = await page.$('.cover');
  if (!coverEl) {
    console.error('ERROR: No .cover element found in template');
    await browser.close();
    process.exit(1);
  }

  const outDir = outputDir || coverDir;
  const pngPath = path.join(outDir, `${baseName}-hires.png`);
  const jpgPath = path.join(outDir, `${baseName}-hires.jpg`);

  // PNG (lossless)
  await coverEl.screenshot({ path: pngPath, type: 'png' });
  console.log(`PNG: ${pngPath}`);

  // JPG — puppeteer max is quality 100, then we re-save via Python for no subsampling
  await coverEl.screenshot({ path: jpgPath, type: 'jpeg', quality: 100 });

  // Re-save JPG with PIL for quality=100 + subsampling=0 (4:4:4) to hit 500KB+
  try {
    execSync(`python3 -c "
from PIL import Image
img = Image.open('${pngPath}')
img.convert('RGB').save('${jpgPath}', 'JPEG', quality=100, subsampling=0)
"`);
  } catch (e) {
    console.log('Warning: PIL re-save failed, using Puppeteer JPG output');
  }

  const fs = require('fs');
  const pngSize = (fs.statSync(pngPath).size / 1024).toFixed(0);
  const jpgSize = (fs.statSync(jpgPath).size / 1024).toFixed(0);
  console.log(`JPG: ${jpgPath}`);
  console.log(`PNG: ${pngSize}KB | JPG: ${jpgSize}KB`);

  await browser.close();
  console.log('Done.');
})();
