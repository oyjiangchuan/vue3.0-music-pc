// 拼接imgurl请求地址
export const genImgUrl = (url: string, w: number, h: number) => {
  if (!h) {
    h = w;
  }
  url += `?param=${w}y${h}`;
  return url;
};

// 添加前缀0
export const pad = (num: number | string, n = 2) => {
  let len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
};

// 判断是否为null和undefined
export const isDef = (v: any) => {
  return v !== undefined && v !== null;
};

// 处理大数
export const formatNumber = (number: number) => {
  number = Number(number) || 0;
  return number > 100000 ? `${Math.round(number / 10000)}万` : number;
};

// 转化分秒
export const formatTime = (interval: number) => {
  interval = interval | 0;
  const minute = pad((interval / 60) | 0);
  const second = pad(interval % 60);
  return `${minute}:${second}`;
};
