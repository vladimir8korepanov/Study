import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));//cors для разрешения запросов с фронта
app.use(express.json());//парсим JSON в теле входящих запросов

// Проверка переменных окружения
if (!process.env.YANDEX_CLIENT_ID || !process.env.YANDEX_CLIENT_SECRET) {
  console.error('YANDEX_CLIENT_ID and YANDEX_CLIENT_SECRET must be defined in .env');
  process.exit(1);
}

interface YandexAuthRequestBody {
  code: string;
}

app.post('/auth/yandex', async (req: Request, res: Response): Promise<void> => {
  const { code } = req.body as YandexAuthRequestBody;//извлекаем код авторизации из тела запроса
    console.log('Received code:', code, 'at', new Date().toISOString());//лог для отлавливания полечения кода

  if (!code) {
    res.status(400).json({ error: 'Authorization code is required' });
    return;
  }

  try {
    // Отправляем параметры в теле запроса
    const tokenRes = await axios.post(
      'https://oauth.yandex.ru/token',
      new URLSearchParams({
        grant_type: 'authorization_code',//обмен кода на токен
        code,
        client_id: process.env.YANDEX_CLIENT_ID!,
        client_secret: process.env.YANDEX_CLIENT_SECRET!,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get('https://login.yandex.ru/info', {
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    });

    res.json({
      access_token: accessToken,
      user: userRes.data,
    });
  } catch (err: any) {
    //лог ошибок с подробностями для откладки
    console.error('OAuth error:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });
    res.status(400).json({ error: 'OAuth failed', details: err.message });
  }
});

app.listen(4000, () => {
  console.log('✅ Server running at http://localhost:4000');
});