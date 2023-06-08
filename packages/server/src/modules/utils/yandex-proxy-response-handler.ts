import type { Request, Response } from 'express';
import type { IncomingMessage } from 'http';

import { createOrUpdate } from '../../controllers/user';
import { yandexAuthUri } from '../../constants/api';

const yandexProxyResponseHandler = (proxyRes: IncomingMessage, req: Request, res: Response) => {
  // Обрабатываем только запросы авторизации
  if (req.url === yandexAuthUri && req.method === 'GET') {
    // Сначала грузим ответ
    let responseBody = '';
    proxyRes.setEncoding('utf-8');
    proxyRes.on('data', chunk => {
      responseBody += chunk;
    });
    // Затем обрабатываем полученный ответ
    proxyRes.on('end', async () => {
      try {
        const data = JSON.parse(responseBody);
        // Если ответ успешный и нет ошибки
        if (res.statusCode === 200 && data) {
          // Добавляем/обновляем юзера в БД
          const modifiedResponse = await createOrUpdate(data);
          res.end(modifiedResponse);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
};

export { yandexProxyResponseHandler };
