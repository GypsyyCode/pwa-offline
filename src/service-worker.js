 /* eslint-disable */ 

 importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
  );

  workbox.loadModule('workbox-precaching');
  workbox.loadModule('workbox-background-sync');
  workbox.loadModule('workbox-routing');
  workbox.loadModule('workbox-strategies');

import {precacheAndRoute} from 'workbox-precaching';
import {BackgroundSyncPlugin, Queue} from 'workbox-background-sync';
import {registerRoute} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);
self.__precacheManifest = [].concat(self.__precacheManifest || []);
precacheAndRoute(self.__precacheManifest, {});

self.skipWaiting();

//Test workbox
if (workbox) {
    console.log('Workbox is loaded');
} else {
    console.log('Workbox did not loaded');
}

console.log("Hello")


// const bgSyncPlugin = new BackgroundSyncPlugin('wrkbeatQueue', {
//   maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
//   onSync: async ({queue}) => {
//       console.log(queue)
//   }
// });

// registerRoute(
// 'https://httpbin.org/post',
//   new NetworkOnly({
//     plugins: [bgSyncPlugin],
//   }),
//   'POST'
// );

workbox.routing.registerRoute(/post/,
  new workbox.strategies.NetworkOnly({
    plugins: [
      new workbox.backgroundSync.BackgroundSyncPlugin('po-data-queue', {
        maxRetentionTime: 2 * 24 * 60 // two days
      })
    ]
  }),
 'POST'
);

// const queue = new Queue('wrkbeatQueue');

// self.addEventListener('fetch', event => {
//   console.log("test")
//   const bgSyncLogic = async () => {
//     try {
//       const response = await fetch(event.request.clone());
//       return response;
//     } catch (error) {
//       await queue.pushRequest({request: event.request});
//       return error;
//     }
//   };

//   event.respondWith(bgSyncLogic());
// });
