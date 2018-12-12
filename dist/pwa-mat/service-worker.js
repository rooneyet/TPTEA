importScripts("precache-manifest.5bd3fbd222b5ab56f9b187c8c3a9fe4b.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js");

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
workbox.core.setCacheNameDetails({prefix: 'tptea'})
self.workbox.precaching.precache(self.__precacheManifest)
workbox.routing.registerRoute(({url}) => {
  return url.search.indexOf('listCategories') > -1
}, workbox.strategies.staleWhileRevalidate())

workbox.routing.registerRoute(({url}) => {
  return url.search.indexOf('getCustomer') > -1
}, workbox.strategies.networkFirst())

workbox.precaching.precache([{url: '/CHANGELOGS.md', revision: new Date().getTime().toString()}])

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})

workbox.skipWaiting()
workbox.clientsClaim()

