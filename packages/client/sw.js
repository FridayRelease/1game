const cacheName = 'app-cache-v1';

// PATHFILES (with quotes) will be auto-replaced (after build) with an array using ./src/utils/get-url-list.ts.
const resourcesToCache = 'PATHFILES';

self.addEventListener('install', event => {
  return event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(resourcesToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(function (keys) {
      // Remove caches whose name is no longer valid
      return Promise.all(
        keys
          .filter(function (key) {
            return key.indexOf(cacheName) !== 0;
          })
          .map(function (key) {
            return caches.delete(key);
          })
      );
    })
  );
});
