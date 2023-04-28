import {
  addCacheFiles,
  addPaths,
  copyFile,
  getFileList,
  removePartPaths,
  uniqueValues,
} from './src/utils/get-url-list';
import { Urls } from './src/constant/router';

const pathToSwFile = 'sw.js';
const pathToBuildFolder = 'dist';
const pathToDistSwFile = `./${pathToBuildFolder}/${pathToSwFile}`;
// const authApi = process.env.VITE_AUTH_API || '';

(async () => {
  await copyFile(pathToSwFile, pathToDistSwFile);

  let files = getFileList(pathToBuildFolder);
  files = await removePartPaths(files, `/${pathToBuildFolder}`);
  files = await addPaths(files, Urls);
  // files = await addPaths(files, [authApi + '/api/v2/auth/user']);
  files = await uniqueValues(files);

  await addCacheFiles(pathToDistSwFile, files);
})();
