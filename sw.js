/* Offline app shell: converter works without network (map tiles still need internet). */
const CACHE = 'kertau-rso-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './vendor/proj4.min.js',
  './vendor/leaflet.js',
  './vendor/leaflet.css',
  './icons/icon.svg'
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
  // Never cache OSM tiles in SW (they are numerous); let them go to network.
  if (url.hostname.includes('tile.openstreetmap.org')) return;
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => res).catch(() => caches.match('./index.html'))));
});
