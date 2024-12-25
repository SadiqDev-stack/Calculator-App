
const assets = [
 'index.html',
 'style.css',
 'main.js',
 'sw.js',
 'manifest.json',
 'icon.png'
];

const cacheName = "Calculator App";

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
})


self.addEventListener('fetch',e => {
  e.respondWith(
     caches.match(e.request).then(response => {
       return response ? response : fetch(e.request)
     })
    )
})
