import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('Building Vite app...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Generating Vercel Build Output API format...');

const outputDir = path.resolve('.vercel', 'output');
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}

// 1. Static files
const staticDir = path.join(outputDir, 'static');
fs.mkdirSync(staticDir, { recursive: true });
fs.cpSync('dist/client', staticDir, { recursive: true });

// 2. Serverless Node.js function (NOT edge — the bundle uses Node-only packages)
const funcDir = path.join(outputDir, 'functions', 'index.func');
fs.mkdirSync(funcDir, { recursive: true });

// Copy the entire server bundle into the function
fs.cpSync('dist/server', path.join(funcDir, 'server'), { recursive: true });

// .vc-config.json — Node.js runtime, not edge
fs.writeFileSync(
  path.join(funcDir, '.vc-config.json'),
  JSON.stringify({
    runtime: 'nodejs22.x',
    handler: 'index.js',
    launchWorker: true,
  }, null, 2)
);

// Serverless handler that wraps the TanStack Start server entry
const handlerCode = `
import { createServer } from 'http';
import { Readable } from 'stream';
import server from './server/server.js';

// Convert a Node.js IncomingMessage to a Web API Request
async function toWebRequest(req) {
  const host = req.headers['host'] || 'localhost';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const url = new URL(req.url, \`\${proto}://\${host}\`);

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach(v => headers.append(key, v));
      } else {
        headers.set(key, value);
      }
    }
  }

  return new Request(url.toString(), {
    method: req.method,
    headers,
    body: body && body.length > 0 ? body : undefined,
    duplex: 'half',
  });
}

// Convert a Web API Response to Node.js ServerResponse
async function writeWebResponse(webRes, res) {
  res.statusCode = webRes.status;
  webRes.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  if (webRes.body) {
    const reader = webRes.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
}

export default async function handler(req, res) {
  try {
    const webReq = await toWebRequest(req);
    const webRes = await server.fetch(webReq, {}, {});
    await writeWebResponse(webRes, res);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
`;
fs.writeFileSync(path.join(funcDir, 'index.js'), handlerCode.trim() + '\n');

// 3. Vercel routing config
fs.writeFileSync(
  path.join(outputDir, 'config.json'),
  JSON.stringify({
    version: 3,
    routes: [
      // Serve static assets directly
      {
        src: '^/assets/(.+)$',
        dest: '/assets/$1',
      },
      // Serve known public files
      {
        src: '^/(hbd\\.mp3|banner\\.png|bd1\\.jpg)$',
        dest: '/$1',
      },
      // Everything else → SSR function
      {
        src: '/(.*)',
        dest: '/index',
      },
    ],
  }, null, 2)
);

console.log('✅ Vercel Build Output generated successfully!');
