import * as fs from 'fs';
import { copyFile as promiseCopyFile, readFile, writeFile } from 'node:fs/promises';

export const copyFile = async (source: string, destination: string) => {
  try {
    await promiseCopyFile(source, destination);
    console.log(`File ${source} was copied to ${destination}`);
  } catch (error) {
    console.log(`File ${source} was not copied to ${destination}. CopyFile error: ${error}`);
  }
};

export const getFileList = (dirName: string) => {
  let files: string[] = [];
  const items = fs.readdirSync(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...getFileList(`${dirName}/${item.name}`)];
    } else {
      files.push(`/${dirName}/${item.name}`);
    }
  }

  return files;
};

export const removePartPaths = async (paths: string[], part: string) => {
  return paths.map(path => {
    const regexp = new RegExp(`^${part}`);
    return path.replace(regexp, '');
  });
};

export const addPaths = async (paths: string[], adds: string[]) => paths.concat(adds);

export const uniqueValues = async (array: string[]) =>
  array.filter((value, index, arr) => arr.indexOf(value) === index);

export const addCacheFiles = async (pathToFile: string, pathToCacheFiles: string[]) => {
  try {
    const content = await readFile(pathToFile, { encoding: 'utf8' });
    const newContent = content.replace(/'PATHFILES'/, JSON.stringify(pathToCacheFiles));
    await writeFile(pathToFile, newContent);

    console.log(`${pathToFile} has been successfully overwritten (with the necessary caches specified).`);
  } catch (error) {
    console.log(`${pathToFile} has not been overwritten. Error: ${error}`);
  }
};
