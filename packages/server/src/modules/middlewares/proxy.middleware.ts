import { createProxyMiddleware } from 'http-proxy-middleware';

import { yandexProxyResponseHandler } from '../utils/yandex-proxy-response-handler';

const proxyMiddleware = () => {
  return createProxyMiddleware({
    cookieDomainRewrite: { '*': '' },
    target: 'https://ya-praktikum.tech',
    secure: false,
    onProxyRes: yandexProxyResponseHandler,
  });
};

export default proxyMiddleware;
