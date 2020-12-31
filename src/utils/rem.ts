import { throttle } from "lodash-es";

export const remBase = 14;

let htmlFontSize: number;

(() => {
  const calc = () => {
    const maxFontSize = 18;
    const minFontSize = 14;
    const html: any = document.getElementsByTagName("html")[0];
    const width = html.clientWidth;
    let size = remBase * (width / 1440);
    size = Math.min(maxFontSize, size);
    size = Math.max(minFontSize, size);
    html.style.fontSize = size + "px";
    htmlFontSize = size;
  };
  calc();
  window.addEventListener("resize", throttle(calc, 500));
})();

// 根据基准字号计算
// 用于静态样式
export const toRem = (px: number) => {
  return `${px / remBase}rem`;
};

// 根据当前的html根字体大小计算
// 用于某些js的动态计算
export const toCurrentRem = (px: number) => {
  return `${px / htmlFontSize}rem`;
};
