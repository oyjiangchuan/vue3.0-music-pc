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

export const shallowEqual = (a: Song[], b: Song[], compareKey: string) => {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    let compareA = a[i];
    let compareB = b[i];
    if (compareKey) {
      compareA = compareA[compareKey];
      compareB = compareB[compareKey];
    }
    if (!Object.is(a[i], b[i])) {
      return false;
    }
  }
  return true;
};

// 锚链接置顶
export const scrollInto = (dom: HTMLElement | null) => {
  if (dom) {
    dom.scrollIntoView({ behavior: "smooth" }); // Element.scrollIntoView()方法
  }
};

// 处理请求偏移量
export const getPageOffset = (page: number, limit: number) => {
  return (page - 1) * limit;
};
