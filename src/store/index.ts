import { createStore, createLogger } from "vuex";
import musicModule from "./modules/music";
const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    music: musicModule
  },
  plugins: debug ? [createLogger()] : [] // 可以创建每次mutation改变state的log-效果: 控制台打印-只在开发环境使用
});
