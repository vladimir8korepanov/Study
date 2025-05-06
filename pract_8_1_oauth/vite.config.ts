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