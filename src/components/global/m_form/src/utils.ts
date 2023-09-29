
export function pickObject(target: Record<string, any>, ...keys: string[]) {
  const obj = {...target};
  for (let key in obj) {
    console.log(key);
    if (Object.hasOwnProperty.call(obj, key)) {
      if (!keys.includes(key)) {
        debugger
        delete obj[key];
      }
    } 
  }
  return obj
}