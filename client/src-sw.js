import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { offlineFallback, warmStrategyCache } from 'workbox-recipes';

precacheAndRoute(self.__WB_MANIFEST);

// Configure a CacheFirst strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
    }),
  ],
});

// Warm the page cache with specified URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register the CacheFirst strategy for navigation requests
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Configure a StaleWhileRevalidate strategy for assets
const assetCache = new StaleWhileRevalidate({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
});

// Register the StaleWhileRevalidate strategy for assets
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  assetCache
);

// Handle offline requests with a custom strategy
setCatchHandler(({ event }) => {
  return offlineFallback({ event });
});
