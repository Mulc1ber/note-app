const staticCacheName = "static-cache-v1";
const dynamicCacheName = "dynamic-cache-v1";

const ASSETS = ["/", "/index.html", "/favicon.ico", "/offline.html"];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(staticCacheName);
  cache.addAll(ASSETS);
});

self.addEventListener("activate", async (event) => {
  const cachesKeysArray = await caches.keys();
  await Promise.all(
    cachesKeysArray
      .filter(
        (cache) => cache !== staticCacheName && cache !== dynamicCacheName
      )
      .map((key) => caches.delete(key))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  try {
    return (
      cached ?? (await fetch(request).then((response) => networkFirst(request)))
    );
  } catch (error) {
    return networkFirst(request);
  }
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;

    if (request.headers.get("accept")?.includes("text/html")) {
      return await caches.match("/offline.html");
    }

    return new Response(null, { status: 504, statusText: "Gateway Timeout" });
  }
}
