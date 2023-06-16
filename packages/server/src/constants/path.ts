import path from 'path';

const distPath = () => path.dirname(require.resolve('client/dist/client/index.html'));
const srcPath = () => path.dirname(require.resolve('client/index.html'));
const ssrClientPath = () => require.resolve('client/dist/ssr/entry-ssr.cjs');

export { distPath, srcPath, ssrClientPath };
