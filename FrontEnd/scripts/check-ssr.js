const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const routes = [
  'index',
  'belt-requirements',
  'stances',
  'blocks',
  'punches',
  'kicks',
  'forms',
  'one-steps',
  'self-defense',
  'instructors',
  'auth/login',
  'unauthorized',
];

for (const route of routes) {
  const file = path.join(__dirname, '..', '.next', 'server', 'app', `${route}.html`);
  const html = fs.readFileSync(file, 'utf8');
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1];
  assert.notEqual(head, undefined, `${route}: server-rendered document head is missing`);

  const componentStyles = [
    ...head.matchAll(
      /<style\b[^>]*data-emotion=["']mui-style\s[^"']*["'][^>]*>([\s\S]*?)<\/style>/g
    ),
  ];
  assert.ok(
    componentStyles.some((match) => match[1].trim().length > 0),
    `${route}: component CSS must reach the document head before hydration`
  );
}

console.log(
  `Verified server-rendered component styles on all ${routes.length} public/utility routes.`
);
