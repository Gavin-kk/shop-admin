export function getBase64(file:File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getBase642(img:any, callback:(imageUrl:any)=>any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
