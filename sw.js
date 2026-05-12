// v7 - always fetch fresh, no cache
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  // Never cache - always fetch live
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
