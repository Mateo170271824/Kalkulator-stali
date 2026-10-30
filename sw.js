// Service worker: aplikacja działa offline. Po każdej zmianie plików podbij wersję.
const VERSION = 'stal-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './fonts/fonts.css',
  "./fonts/ibm-plex-mono-latin-400-normal.woff2",
  "./fonts/ibm-plex-mono-latin-500-normal.woff2",
  "./fonts/ibm-plex-mono-latin-600-normal.woff2",
  "./fonts/ibm-plex-mono-latin-ext-400-normal.woff2",
  "./fonts/ibm-plex-mono-latin-ext-500-normal.woff2",
  "./fonts/ibm-plex-mono-latin-ext-600-normal.woff2",
  "./fonts/ibm-plex-sans-condensed-latin-400-normal.woff2",
  "./fonts/ibm-plex-sans-condensed-latin-500-normal.woff2",
  "./fonts/ibm-plex-sans-condensed-latin-600-normal.woff2",
  "./fonts/ibm-plex-sans-condensed-latin-700-normal.woff2",
  "./fonts/ibm-plex-sans-condensed-latin-ext-400-normal.woff2",
  "./fonts/ibm-plex-sans-condensed-latin-ext-500-normal.woff2",
  "./fonts/ibm-plex-sans-condensed-latin-ext-600-normal.woff2",
  "./fonts/ibm-plex-sans-condensed-latin-ext-700-normal.woff2",
  './vendor/pdfjs/pdf.min.js',
  './vendor/pdfjs/pdf.worker.min.js',
  './vendor/xlsx.full.min.js',
  './vendor/jspdf.umd.min.js',
  './vendor/jspdf.plugin.autotable.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // Strona: najpierw sieć (świeża wersja), offline z pamięci. Reszta: najpierw pamięć.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
