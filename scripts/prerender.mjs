// Pre-render: inyecta el HTML de la app dentro de dist/index.html.
// Se ejecuta automáticamente al final de "npm run build".
import fs from 'node:fs';

const INDEX = 'dist/index.html';

const { render } = await import('../dist-ssr/entry-server.js');

const html = fs.readFileSync(INDEX, 'utf8');
const marker = '<div id="root">';

if (!html.includes(marker)) {
  console.error('[prerender] No se encontró <div id="root"> en dist/index.html');
  process.exit(1);
}

const appHtml = render();
const out = html.replace(marker + '</div>', marker + appHtml + '</div>');

fs.writeFileSync(INDEX, out);
fs.rmSync('dist-ssr', { recursive: true, force: true });

const kb = Math.round(Buffer.byteLength(appHtml, 'utf8') / 1024);
console.log(`[prerender] OK — ${kb} KB de contenido HTML inyectados en dist/index.html`);
