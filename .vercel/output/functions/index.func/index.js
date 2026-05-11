import server from './server/server.js';

export default async function handler(req, res) {
  try {
    const host = req.headers['host'] || 'localhost';
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const url = new URL(req.url, `${proto}://${host}`);

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
