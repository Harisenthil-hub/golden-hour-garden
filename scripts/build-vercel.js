import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 Starting Vercel Build Process...');

// 1. Run the standard build
console.log('📦 Building Vite application...');
execSync('npm run build', { stdio: 'inherit' });

console.log('🛠️ Generating Vercel Build Output API structure...');

const outputDir = path.resolve('.vercel', 'output');
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}

// Create structure
const staticDir = path.join(outputDir, 'static');
const funcDir = path.join(outputDir, 'functions', 'index.func');

fs.mkdirSync(staticDir, { recursive: true });
fs.mkdirSync(funcDir, { recursive: true });

// 2. Copy static files (CDN)
console.log('📂 Copying static assets to .vercel/output/static...');
if (fs.existsSync('dist/client')) {
  fs.cpSync('dist/client', staticDir, { recursive: true });
}

// 3. Setup Serverless Function
console.log('⚙️ Setting up Serverless Function...');

// Copy server bundle
if (fs.existsSync('dist/server')) {
  fs.cpSync('dist/server', path.join(funcDir, 'server'), { recursive: true });
}

// Generate function config
fs.writeFileSync(
  path.join(funcDir, '.vc-config.json'),
  JSON.stringify({
    runtime: 'nodejs20.x',
    handler: 'index.js',
    launcherType: 'Nodejs',
    shouldAddHelpers: true
  }, null, 2)
);

// Generate package.json for the function to support ESM
fs.writeFileSync(
  path.join(funcDir, 'package.json'),
  JSON.stringify({
    type: 'module'
  }, null, 2)
);

// Serverless handler: Bridge between Node.js (req, res) and Web (Request, Response)
const handlerCode = `
import server from './server/server.js';

export default async function handler(req, res) {
  try {
    const host = req.headers['host'] || 'localhost';
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const url = new URL(req.url, \`\${proto}://\${host}\`);

    // Prepare headers
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) value.forEach(v => headers.append(key, v));
        else headers.set(key, value);
      }
    }

    // Read body if exists
    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      body = Buffer.concat(chunks);
    }

    // Create Web Request
    const webReq = new Request(url.toString(), {
      method: req.method,
      headers,
      body: body && body.length > 0 ? body : null,
      duplex: 'half'
    });

    // Call TanStack Start Server
    const webRes = await server.fetch(webReq, {}, {});

    // Send Response back to Node.js
    res.statusCode = webRes.status;
    webRes.headers.forEach((v, k) => res.setHeader(k, v));
    
    if (webRes.body) {
      const reader = webRes.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error('❌ Serverless Function Error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
`;

fs.writeFileSync(path.join(funcDir, 'index.js'), handlerCode.trim() + '\n');

// 4. Generate Routing Config
console.log('🗺️ Generating Vercel routing configuration...');
fs.writeFileSync(
  path.join(outputDir, 'config.json'),
  JSON.stringify({
    version: 3,
    routes: [
      {
        src: '^/assets/(.+)$',
        dest: '/assets/$1'
      },
      {
        src: '^/(hbd\\.mp3|banner\\.png|bd1\\.jpg)$',
        dest: '/$1'
      },
      {
        src: '/(.*)',
        dest: '/index'
      }
    ]
  }, null, 2)
);

console.log('✅ Vercel Build Output generated successfully!');
