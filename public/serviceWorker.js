const cacheName = `rick-and-morty-cache-v1`;
const urlToCache = {
  location: 'https://rickandmortyapi.com/api/location',
  character: /https:\/\/rickandmortyapi.com\/api\/character\/(\d)/,
}
const dbName = 'rickAndMortyData'
const dbVersion = 1
const objectStoreName = {
  location: 'location',
  character: 'character'
}

let client = '';
let db;

class ApiValidator {
  isLocationUrl(reqUrl) {
    return this._execute(urlToCache.location, reqUrl);
  }

  isCharacterUrl(reqUrl) {
    return this._execute(urlToCache.character, reqUrl);
  }

  _execute(pattern, url) {
    return new RegExp(pattern).test(url);
  }
}
const apiValidator = new ApiValidator();

class CacheStrategy {
  async cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const response = await cache.match(req);
    if (response) {
      return response;
    }
    const networkResponse = await fetch(req);
    cache.put(req, networkResponse.clone());
    return networkResponse;
  }
}
const cacheStrategy = new CacheStrategy();

class IDB {
  async open(upgrade) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, dbVersion);
      request.onerror = function() {
        reject(request.errorCode);
      }
      request.onsuccess = function(e) {
        resolve(e.target.result);
      }
      request.onupgradeneeded = function(e) {
        if (typeof upgrade === 'function') {
          upgrade(e);
        }
      }
    })
  }

  async getAll(db, collection) {
    const transaction = db.transaction(collection, "readonly");
    const objStore = transaction.objectStore(collection);
    const req = objStore.getAll()
    return this._promisify(req);
  }

  async get(db, collection, key) {
    const transaction = db.transaction(collection, "readonly");
    const objStore = transaction.objectStore(collection);
    const req = objStore.get(key)
    return this._promisify(req);
  }

  async insert(db, collection, data) {
    const transaction = db.transaction(collection, "readwrite");
    const objStore = transaction.objectStore(collection);
    const req = objStore.add(data)
    return this._promisify(req);
  }

  async _promisify(req) {
    return new Promise((resolve, reject) => {
      req.onsuccess = (e) => {
        resolve(e.target.result);
      }
      req.onerror = (e) => {
        reject(e);
      }
    })
  }
}
const idb = new IDB();

class SW {
  install = (e) => {
    e.waitUntil(
      caches.open(cacheName).then(function (cache) {
        return cache.addAll([
          '/index.html'
        ]);
      }),
    );
  };

  activate = (e) => {
    e.waitUntil(
      (async function () {
        // Remove old caching
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map((thisCacheName) => {
            if (thisCacheName !== cacheName) {
              return caches.delete(thisCacheName);
            }
            return Promise.resolve();
          }),
        );

        const upgradeDb = (e) => {
          const db = e.target.result;
          const locationObjectStore = db.createObjectStore(objectStoreName.location, { keyPath: "id" });
          locationObjectStore.transaction.oncomplete = () => {
            console.log('Created location object store');
          }
          const charObjectStore = db.createObjectStore(objectStoreName.character, { keyPath: "id" });
          charObjectStore.transaction.oncomplete = () => {
            console.log('Created character object store');
          }
        }

        db = await idb.open(upgradeDb);
      })(),
    );
  };

  fetch = (e) => {
    const self = this;
    e.respondWith(
      (async function () {
        const { request: req, clientId } = e;

        if (req.method === 'GET') {
          client = await clients.get(clientId);
          const url = new URL(req.url);
          if (url.host === location.host) {
            return cacheStrategy.cacheFirst(req);
          }

          if (db) {
            if (apiValidator.isLocationUrl(req.url)) {
              return self._handleLocationUrl(req)
            }
            if (apiValidator.isCharacterUrl(req.url)) {
              return self._handleCharacterUrl(req)
            }
          }
        }

        return fetch(e.request);
      })()
    )
  }

  async _handleLocationUrl(req) {
    const locations = await idb.getAll(db, objectStoreName.location);
    if (locations.length === 0) {
      const res = await fetch(req);
      const cloneRes = res.clone()
      const data = await cloneRes.json()
      for(let i=0; i< data.results.length; i++) {
        const loc = data.results[i];
        await idb.insert(db, objectStoreName.location, loc);
      }
      return res;
    }
    return new Response(JSON.stringify({ results: locations }));
  }

  async _handleCharacterUrl(req) {
    const characterId = req.url.split('/').pop()
    const character = await idb.get(db, objectStoreName.character, parseInt(characterId));
    if (!character) {
      const res = await fetch(req);
      const cloneRes = res.clone()
      const data = await cloneRes.json()
      await idb.insert(db, objectStoreName.character, data)
      return res;
    }
    return new Response(JSON.stringify(character));
  }
}

const worker = new SW();

// Install Service Worker
self.addEventListener('install', worker.install);

// Activated
self.addEventListener('activate', worker.activate);

// Handle fetch
self.addEventListener('fetch', worker.fetch);
