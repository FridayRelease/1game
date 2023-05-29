import {mockCommentsGETByIdTopic5} from '../../src/mock/mockCommentsByIdTopic5';

const obj = JSON.parse(mockCommentsGETByIdTopic5)
function getComments(obj: Object): any {
  let arr, main = [];
  Object.entries(obj)
    .map(([key, value]) => {

      while (key !== 'comments') {
        console.log('arr = ',[key, value])
      }
      if (key === 'comments'){
        //main.push(arr);
        console.log('arr = ', arr)
        //console.log('main = ', main)
        arr = [];
        if (value === null){
          ;
        } else {
          getComments(value[0])
        }
      }
    })
  return main;
}