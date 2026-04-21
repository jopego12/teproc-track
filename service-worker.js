const CACHE_NAME = "teproc-track-v2";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "/teproc-track/",
        "/teproc-track/index.html",
        "/teproc-track/manifest.json",
        "/teproc-track/icon-192.png",
        "/teproc-track/icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {

  const url = new URL(e.request.url);

  // 🚫 NO interceptar llamadas externas (Google Sheets, APIs, etc)
  if (url.origin !== location.origin) {
    return;
  }

  // ✅ Solo manejar archivos de tu app
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});