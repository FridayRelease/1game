export function getComments(obj: any): any {
  let arr = [];
  const main = [];
  Object.entries(obj)
    .map(([key, value]) => {

      if (key !== 'comments') {
        console.log('arr = ',[key, value])
        arr.push([key, value])
      }
      if (key === 'comments'){
        if (value === undefined){
          main.push(arr);
          console.log('main after comments= ', main)
          arr = [];
        } else {
          getComments(value)
        }
      }
    })
  return main;
}