// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     strictPort: true,
//     // Уберите все упоминания HTTPS
//     hmr: {
//       clientPort: 5173
//     }
//   },
//   build: {
//     sourcemap: true // Для отладки
//   }
// });
// vite.config.ts
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import basicSsl from '@vitejs/plugin-basic-ssl';
// import history from 'connect-history-api-fallback';
// import type { Plugin } from 'vite';

// function spaFallback(): Plugin {
//   return {
//     name: 'spa-fallback',
//     configureServer(server) {
//       server.middlewares.use(
//         history({
//           disableDotRule: true,
//           htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
//         })
//       );
//     },
//   };
// }

// export default defineConfig({
//   plugins: [
//     react(),
//     basicSsl({
//       certDir: './.cert',
//     }),
//     spaFallback(), // 👈 добавлено сюда
//   ],
//   server: {
//     https: true,
//     port: 5173,
//     headers: {
//       'Content-Security-Policy':
//         "default-src 'self'; " +
//       "script-src 'self' 'unsafe-inline' https://yastatic.net; " +
//       "style-src 'self' 'unsafe-inline'; " +
//       "img-src 'self' data: https:; " +
//       "connect-src 'self' https://oauth.yandex.ru; " +
//       "frame-src 'self' https://oauth.yandex.ru; " +
//       "frame-ancestors 'self' http://localhost:5173;"
//     },
//   },
// });
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react(),
    basicSsl() // Для генерации SSL сертификатов
  ],
  server: {
    https: true,
    port: 5173,
    hmr: {
      protocol: 'wss', // Используем безопасный WebSocket
      host: 'localhost'
    },
    headers: {
      'Content-Security-Policy': 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://yastatic.net; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self' https://oauth.yandex.ru https://autofill.yandex.ru; " +
        "frame-src 'self' https://oauth.yandex.ru; " +
        "frame-ancestors 'self' https://localhost:5173;"
    }
  }
});