// Definimos el nombre del contenedor de caché y la versión de la app
const CACHE_NAME = 'material-ef-v1';

// Lista de archivos que el código guardará para que la app funcione sin internet
const ARCHIVOS_A_GUARDAR = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

// Evento 1: Se ejecuta al instalar la PWA y guarda los archivos requeridos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Guardando código en memoria caché...');
      return cache.addAll(ARCHIVOS_A_GUARDAR);
    })
  );
});

// Evento 2: Se ejecuta cada vez que la app pide datos (intercepta la red)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((respuestaGuardada) => {
      // Si la página/archivo está en la memoria caché, lo entrega de inmediato
      if (respuestaGuardada) {
        return respuestaGuardada;
      }
      // Si no está guardado, realiza la petición por internet
      return fetch(event.request);
    })
  );
});