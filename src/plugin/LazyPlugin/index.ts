// 外部引入lazyload的js文件
import lazyload from "./lazyload.js";
import { App } from "vue";

const LazyPlugin: any = {};

LazyPlugin.install = (Vue: App) => {
  Vue.directive("lazy", lazyload);
};

export default LazyPlugin;
