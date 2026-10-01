import fs from 'node:fs';

const checks = [
  {
    file: 'index.html',
    forbidden: [
      'umami.lazygyu.net',
      "gtag('config', 'G-5899C1DJM0')",
      'window.ads',
      'marblerouletteshop.com',
      'id="btnShop"',
      '광고문의',
    ],
  },
  {
    file: 'src/index.ts',
    forbidden: ['AdService', 'marblerouletteshop.com', 'window as any).ads', 'umami?.track'],
  },
  {
    file: 'src/keywordService.ts',
    forbidden: ['marblerouletteshop.com'],
  },
];

let failed = false;
for (const { file, forbidden } of checks) {
  const content = fs.readFileSync(file, 'utf8');
  for (const token of forbidden) {
    if (content.includes(token)) {
      console.error(`[clean-fork] ${file}: forbidden token remains: ${token}`);
      failed = true;
    }
  }
}

if (fs.existsSync('src/adService.ts')) {
  console.error('[clean-fork] src/adService.ts must be removed');
  failed = true;
}

if (failed) process.exit(1);
console.log('[clean-fork] no advertising or analytics endpoints detected');
