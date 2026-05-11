import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('Building Vite app...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Generating Vercel static output...');

const outputDir = path.resolve('.vercel', 'output');
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}

const staticDir = path.join(outputDir, 'static');
fs.mkdirSync(staticDir, { recursive: true });

// Copy all client-side assets
fs.cpSync('dist/client', staticDir, { recursive: true });

// Find the generated CSS and JS file names from the assets folder
const assetsDir = path.join(staticDir, 'assets');
const assetFiles = fs.readdirSync(assetsDir);
const cssFile = assetFiles.find(f => f.startsWith('styles-') && f.endsWith('.css'));
const jsFiles = assetFiles.filter(f => f.endsWith('.js') && !f.startsWith('_'));

// Generate a proper index.html that bootstraps the React/TanStack app client-side
const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Golden Hour Garden 🌻</title>
    <meta name="description" content="A cinematic golden hour birthday garden — a gift from the heart." />
    <meta property="og:title" content="Golden Hour Garden 🌻" />
    <meta property="og:description" content="A cinematic golden hour birthday garden." />
    <meta name="twitter:card" content="summary" />
    ${cssFile ? `<link rel="stylesheet" crossorigin href="/assets/${cssFile}" />` : ''}
  </head>
  <body>
    ${jsFiles.map(f => `<script type="module" crossorigin src="/assets/${f}"></script>`).join('\n    ')}
  </body>
</html>`;

fs.writeFileSync(path.join(staticDir, 'index.html'), indexHtml);
console.log(`Generated index.html with:`);
console.log(`  CSS: ${cssFile}`);
console.log(`  JS:  ${jsFiles.join(', ')}`);

// Vercel routing: serve static assets directly, everything else → index.html (SPA)
fs.writeFileSync(
  path.join(outputDir, 'config.json'),
  JSON.stringify({
    version: 3,
    routes: [
      { handle: 'filesystem' },
      { src: '/(.*)', dest: '/index.html' }
    ]
  }, null, 2)
);

console.log('✅ Static Vercel build output ready!');
