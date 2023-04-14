const cacheName = 'site-cache-v1';
const assetsToCache = ['asset.js'];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(assetsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
  );
});

self.addEventListener("activate", event => {
  console.log("activate");
});
