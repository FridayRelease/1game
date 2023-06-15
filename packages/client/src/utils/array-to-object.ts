import { IComment } from '@/api/types';

export function arrayToObject(arr: IComment[]) {
  arr.sort((x, y) => x.id - y.id);
  const result:IComment[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].comment_id !== null) {
      for (let j = 0; j < result.length; j++) {
        if (result[j].id === arr[i].comment_id) {
          if (result[j].comments === undefined) {
            result[j].comments = [arr[i]];
          } else {
            // @ts-ignore
            result[j].comments.push(arr[i]);
          }

        } else if (j === result.length - 1 && result[j].id !== arr[i].comment_id) {
          iterateArrayOfObject(result);
        } else {
          console.log('ошибка вставки коммента = ', arr[i]);
        }
      }
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

function iterateArrayOfObject(array: IComment[]) {
  array.forEach(arr => {
    //console.log(`current comment = : ${arr}, comment_id: ${arr.comment_id}`);

    if (typeof arr.comments !== undefined) {
      //@ts-ignore
      iterateArrayOfObject(arr.comments);
    }
  });
}