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

fs.mkdirSync(path.join(outputDir, 'static'), { recursive: true });
fs.mkdirSync(path.join(outputDir, 'functions', 'index.func'), { recursive: true });

// Copy static assets
fs.cpSync('dist/client', path.join(outputDir, 'static'), { recursive: true });

// Create Vercel function config
fs.writeFileSync(path.join(outputDir, 'functions', 'index.func', '.vc-config.json'), JSON.stringify({
  runtime: 'edge',
  entrypoint: 'index.js'
}, null, 2));

// Create Edge function entrypoint
const edgeFunctionCode = `
import server from '../../../../dist/server/server.js';
export default async function handler(request) {
  return await server.fetch(request);
}
`;
fs.writeFileSync(path.join(outputDir, 'functions', 'index.func', 'index.js'), edgeFunctionCode);

// Create Vercel routing config
fs.writeFileSync(path.join(outputDir, 'config.json'), JSON.stringify({
  version: 3,
  routes: [
    { handle: "filesystem" },
    { src: "/(.*)", dest: "/" }
  ]
}, null, 2));

console.log('Vercel Build Output generated successfully!');
