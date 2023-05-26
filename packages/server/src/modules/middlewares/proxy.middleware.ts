import { createProxyMiddleware } from 'http-proxy-middleware';

const proxyMiddleware = () => {
  return createProxyMiddleware({
    cookieDomainRewrite: { '*': '' },
    target: 'https://ya-praktikum.tech',
    secure: false,
  });
};

export default proxyMiddleware;
