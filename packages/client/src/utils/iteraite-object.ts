export const iterate = (obj:any) => {
  Object.keys(obj).forEach(key => {

    console.log(`key: ${key}, value: ${obj[key]}`)

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      iterate(obj[key])
    }
  })
}

export function iterateObject (obj:any) {
  Object.keys(obj).forEach(key => {

    console.log(`key: ${key}, value: ${obj[key]}`)

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      iterateObject(obj[key])
    }
  })
}