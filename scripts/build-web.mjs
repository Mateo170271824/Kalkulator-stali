// Składa stronę do katalogu www/ – z niego korzysta GitHub Pages oraz aplikacja Android.
import { cpSync, rmSync, mkdirSync } from 'node:fs';
import { build } from 'esbuild';

const out = 'www';
rmSync(out, { recursive: true, force: true });
mkdirSync(out);
for (const f of ['index.html', 'manifest.webmanifest', 'sw.js', '.nojekyll', 'icons', 'fonts', 'vendor']) {
  cpSync(f, `${out}/${f}`, { recursive: true });
}
await build({
  entryPoints: ['src/native.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2019'],
  outfile: `${out}/vendor/native.js`,
  logLevel: 'warning'
});
console.log('www/ gotowe');
