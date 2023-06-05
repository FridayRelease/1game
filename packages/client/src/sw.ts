import { cleanupOutdatedCaches, precacheAndRoute, PrecacheEntry } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { paths } from './constant/game-path';

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST.filter((r: PrecacheEntry | string) => (r as PrecacheEntry)?.url !== 'index.html'));

// загрузка данных для игры
precacheAndRoute(paths.map(url => ({ url, revision: null })));

// clean old assets
cleanupOutdatedCaches();

// Кешируем файлы со шрифтами с помощью стратегии `cache-first` на 1 год
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// Кешируем изображения со шрифтами с помощью стратегии `cache-first` на 1 год
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
      }),
    ],
  })
);

registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/assets/'),
  new StaleWhileRevalidate(),
  'GET'
);

// Установка таймера на выполнение сетевого запроса
registerRoute(
  new RegExp('/api/*'),
  new NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'stories',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 минут
      }),
    ],
  }),
  'GET'
);

self.skipWaiting();
clientsClaim();
