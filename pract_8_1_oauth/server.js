// server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const PORT = 3001;

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Настройка CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'frame-ancestors': ["'self'", 'https://autofill.yandex.ru', 'http://localhost:5173'],
        'frame-src': ["'self'", 'mc.yandex.ru', 'mc.yandex.com', 'autofill.yandex.ru'],
        'script-src': ["'self'", "'unsafe-inline'", 'mc.yandex.ru', 'mc.yandex.com'],
        'img-src': ["'self'", 'mc.yandex.ru', 'mc.yandex.com'],
      },
    },
  })
);

// Маршрут для авторизации
app.get('/auth/yandex', (req, res) => {
  const clientId = 'ef65f055cb1b4a15ae31f33a652e8d8f';
  const redirectUri = `http://localhost:${PORT}/callback`;
  const authUrl = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;
  res.redirect(authUrl);
});

// Обработка callback
app.get('/callback', (req, res) => {
  const token = req.query.access_token;
  if (token) {
    res.redirect(`http://localhost:5173/callback?access_token=${token}`);
  } else {
    res.status(400).send('Authorization failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});