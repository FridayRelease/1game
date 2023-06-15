import { IComment } from '@/api/types';

export function arrayToObject(arr: IComment[]) {
  arr.sort((x, y) => x.id - y.id);
  const result: IComment[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].comment_id === null) {
      result.push(arr[i]);
    } else {//else 1 = arr[i].comment_id !== null
      for (let j = 0; j < result.length; j++) {
        if (result[j].id === arr[i].comment_id) {
          if (result[j].comments === undefined) {
            result[j].comments = [arr[i]];
          } else {
            // @ts-ignore
            result[j].comments.push(arr[i]);
          }
          break;
        } else if ((result[j].id !== arr[i].comment_id) && (j === result.length - 1)) {
          //
          for (let k = 0; k < result.length; k++) {
            if (result[k].comments !== undefined) {
              for (let n = 0; n < result[k].comments!.length; n++) {
                if (result[k].comments![n].id === arr[i].comment_id) {
                  if (result[j].comments![n].comments === undefined) {
                    result[j].comments![n].comments = [arr[i]];
                  } else {
                    result[j].comments![n].comments!.push(arr[i]);
                  }
                  break;
                }
              }
            }
          }

        } else {
          ;//console.log('Error in addComment');
        }
      }//end of for j

    }//end else 1
  }//end for i
  return result;
}
