import server from '../dist/server/index.js';

function nodeHeadersToHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(nodeHeaders || {})) {
    if (value === undefined) continue;
    headers.set(key, Array.isArray(value) ? value.join(',') : String(value));
  }
  return headers;
}

export default async function handler(req, res) {
  try {
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const url = `${proto}://${host}${req.url}`;

    const headers = nodeHeadersToHeaders(req.headers);

    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = await new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', (c) => chunks.push(Buffer.from(c)));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
      });
      if (body.length === 0) body = undefined;
    }

    const request = new Request(url, {
      method: req.method,
      headers,
      body,
    });

    const workerResponse = await server.fetch(request, {}, {});

    // copy status and headers
    res.statusCode = workerResponse.status;
    workerResponse.headers.forEach((value, key) => res.setHeader(key, value));

    const buf = Buffer.from(await workerResponse.arrayBuffer());
    res.end(buf);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
