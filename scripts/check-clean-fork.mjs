import fs from 'node:fs';
import path from 'node:path';

const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.html', '.scss', '.css', '.json']);

function collectFiles(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];

  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(target, entry.name);
    if (entry.isDirectory()) return collectFiles(child);
    return sourceExtensions.has(path.extname(entry.name)) ? [child] : [];
  });
}

const appFiles = ['index.html', ...collectFiles('src')];
const forbidden = [
  ['upstream analytics host', 'umami.lazygyu.net'],
  ['Google Analytics property', 'G-5899C1DJM0'],
  ['ad runtime hook', 'window.ads'],
  ['ad service class', 'AdService'],
  ['upstream shop endpoint', 'marblerouletteshop.com'],
  ['shop UI', 'id="btnShop"'],
  ['advertising contact UI', '광고문의'],
  ['Umami event tracking', 'umami.track'],
];

let failed = false;
for (const file of appFiles) {
  const content = fs.readFileSync(file, 'utf8');
  for (const [label, token] of forbidden) {
    if (content.includes(token)) {
      console.error(`[clean-fork] ${file}: ${label} remains (${token})`);
      failed = true;
    }
  }
}

if (fs.existsSync('src/adService.ts')) {
  console.error('[clean-fork] src/adService.ts must be removed');
  failed = true;
}

if (failed) process.exit(1);
console.log(`[clean-fork] checked ${appFiles.length} app files; no advertising or analytics endpoints detected`);
