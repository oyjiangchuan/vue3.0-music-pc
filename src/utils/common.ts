// 拼接imgurl请求地址
export const genImgUrl = (url: string, w: number, h: number) => {
  if (!h) {
    h = w;
  }
  url += `?param=${w}y${h}`;
  return url;
};

export const pad = (num: number | string, n = 2) => {
  let len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
};
