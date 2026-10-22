// Network-first: always try fresh data, fall back to cache only when offline.
const C="chennai-rain-v1";
self.addEventListener("install",e=>{self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(self.clients.claim())});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(r=>{
    const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r;
  }).catch(()=>caches.match(e.request)));
});
