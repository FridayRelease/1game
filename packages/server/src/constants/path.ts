import path from 'path';

const distPath = path.dirname(require.resolve('client/dist/client/index.html'));
const srcPath = path.dirname(require.resolve('client/index.html'));

export { distPath, srcPath };
