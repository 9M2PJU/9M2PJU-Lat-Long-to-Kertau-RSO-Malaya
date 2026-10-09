/* Offline app shell: converter works without network (map tiles still need internet). */
const CACHE = 'kertau-rso-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './vendor/proj4.min.js',
  './vendor/leaflet.js',
  './vendor/leaflet.css',
  './vendor/images/layers.png',
  './vendor/images/layers-2x.png',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Map tiles are numerous and need internet — never intercept them.
  if (url.hostname.includes('tile.openstreetmap.org')) return;
  if (url.hostname.includes('server.arcgisonline.com')) return;
  // Page itself: network-first so updates (e.g. layout fixes) reach the phone.
  if (e.request.mode === 'navigate' || url.pathname.endsWith('index.html')) {
    e.respondWith(
      fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => res).catch(() => caches.match('./index.html'))));
});
