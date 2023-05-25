import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Request } from 'express';

const cookiesList = ['authCookie', 'uuid'];

// Фильтр куки, оставляет только те, что нужны для Яндекс Свагер Апи
export const filterCookies = (req: Request): string => {
  const cookies = req.headers.cookie?.split(';');
  const filteredCookies = cookies?.filter(cookie =>
    cookiesList.some(cookieName => cookie.trim().startsWith(`${cookieName}=`))
  );
  if (filteredCookies && filteredCookies.length) {
    return filteredCookies.join('; ');
  }
  return '';
};

const proxyMiddleware = () => {
  return createProxyMiddleware({
    cookieDomainRewrite: { '*': '' },
    target: 'https://ya-praktikum.tech',
    secure: false,
    onProxyReq: (proxyReq, req) => {
      const filteredCookies = filterCookies(req);
      proxyReq.setHeader('cookie', filteredCookies);

      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        console.warn('----', req.url);
        console.warn(req.headers);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },

    onError: err => {
      console.log('[Error] proxyMiddleware:', err);
    },
  });
};

export default proxyMiddleware;
