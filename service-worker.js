const CACHE_NAME = "teproc-track-v2";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./icon-192.png",
        "./icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);

  // No tocar APIs externas
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});