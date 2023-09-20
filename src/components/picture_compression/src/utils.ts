// 压缩函数
export function imageCompression(
  imageURL: string,
  quality: number = 100,
  imageType: string = "image/png"
): Promise<Blob | null> {
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.src = imageURL;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      // 在实际的工作中，根据业务来计算相应的宽度，这里只是进行一个演示的小demo
      canvas.width = img.width;
      canvas.height = img.height; // 获取上下文
      ctx.drawImage(img, 0, 0, img.width, img.height); // 将图片压缩
      canvas.toBlob((blob)=> {
        resolve(blob);
      }, imageType, quality);

    };
  });
}

export function readFileDataForUrl(file: File): Promise<FileReader["result"]> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const file = (e.currentTarget as FileReader).result;
      resolve(file);
    };
  });
}
