/**
 * fix-logos.js
 * Reusable tool to regenerate all HIK brand logos with a corrected tagline.
 * Uses git to pull clean originals (transparent, design-tool quality).
 * Requires: puppeteer, sharp
 *
 * Usage: node fix-logos.js
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const { execSync } = require('child_process');
const sharp = require('sharp');

const TAGLINE = 'The AI advises, HIK authorizes.';

// Git ref for the original transparent logos (before any patching)
const ORIG_REF = '62ff0d8';

const logos = [
  {
    // Vertical dark — used in hero at h-32~h-52 (128–208px tall).
    // Canvas 521×616. Scale at h-52: 208/616 ≈ 0.34.
    // Target 92% canvas width coverage → font ~36px → renders ~12px on screen.
    name: 'logo-v-dark.png',
    eraseY: 502,     // original tagline starts at y=509, erase 7px early for clean gap
    color: '#FFFFFF',
    targetCoverage: 0.92,
  },
  {
    // Horizontal nav — used in navbar at ~40–48px display height.
    // Canvas 448×239. Use 92% width coverage.
    name: 'logo-nav-dark.png',
    eraseY: 173,
    color: '#FFFFFF',
    targetCoverage: 0.92,
  },
  {
    // Horizontal footer — canvas 1188×309.
    // Cap font at ~12% of canvas height (309*0.12≈37px) so it doesn't dwarf the tagline.
    name: 'logo-footer-dark.png',
    eraseY: 236,
    color: '#FFFFFF',
    targetCoverage: 0.42,
  },
  {
    // Same as footer, used in governance dashboard TopNav.
    name: 'logo-nav-alt.png',
    eraseY: 236,
    color: '#FFFFFF',
    targetCoverage: 0.42,
  },
];

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent('<!DOCTYPE html><html><body style="margin:0;padding:0"><canvas id="c"></canvas></body></html>');

  for (const cfg of logos) {
    console.log(`\n--- ${cfg.name} ---`);

    // Pull clean original binary from git (avoids PowerShell encoding corruption)
    const origBuf = execSync(
      `git show ${ORIG_REF}:frontend-next/public/${cfg.name}`,
      { maxBuffer: 20 * 1024 * 1024, encoding: 'buffer' }
    );
    console.log(`  original: ${origBuf.length} bytes`);

    const { width: W, height: H } = await sharp(origBuf).metadata();
    console.log(`  dimensions: ${W}×${H}`);

    // Erase tagline band using sharp (pixel-perfect transparent erase)
    const { data } = await sharp(origBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const buf = Buffer.from(data);
    for (let y = cfg.eraseY; y < H; y++)
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        buf[i] = buf[i + 1] = buf[i + 2] = buf[i + 3] = 0;
      }
    const noTagline = await sharp(buf, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();

    // Render corrected tagline via Puppeteer canvas
    // Binary search for font size that fills `targetCoverage` of canvas width
    const b64 = noTagline.toString('base64');
    const result = await page.evaluate(async (b64, W, H, eraseY, color, targetCoverage, tagline) => {
      const canvas = document.getElementById('c');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = 'data:image/png;base64,' + b64;
      await new Promise(r => { img.onload = r; });
      canvas.width = W;
      canvas.height = H;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, 0, 0);

      // Find largest font where text fits within targetCoverage × W
      const targetWidth = W * targetCoverage;
      let lo = 8, hi = 200;
      for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        ctx.font = `italic ${mid}px Arial, sans-serif`;
        if (ctx.measureText(tagline).width < targetWidth) lo = mid; else hi = mid;
      }
      const fontSize = Math.floor(lo);

      // Vertically center baseline in the space below eraseY
      const taglineY = Math.round(eraseY + (H - eraseY) * 0.62);

      ctx.font = `italic ${fontSize}px Arial, sans-serif`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.fillText(tagline, W / 2, taglineY);

      return { dataUrl: canvas.toDataURL('image/png'), fontSize, taglineY };
    }, b64, W, H, cfg.eraseY, cfg.color, cfg.targetCoverage, TAGLINE);

    console.log(`  font: ${result.fontSize}px  baseline: y=${result.taglineY}`);

    const finalBuf = Buffer.from(result.dataUrl.replace(/^data:image\/png;base64,/, ''), 'base64');
    fs.writeFileSync(`public/${cfg.name}`, finalBuf);
    console.log(`  ✓ saved (${finalBuf.length} bytes)`);
  }

  await browser.close();
  console.log('\n✅ All logos updated.');
})();
