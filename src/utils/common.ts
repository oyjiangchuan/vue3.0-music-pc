// 拼接imgurl请求地址
export const genImgUrl = (url: string, w: number, h: number) => {
  if (!h) {
    h = w;
  }
  url += `?param=${w}y${h}`;
  return url;
};
