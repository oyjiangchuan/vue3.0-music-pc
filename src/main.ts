import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "@/style/index.scss";

import globalRegister from "./components/globalRegister";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Antd);
globalRegister(app);
app.mount("#app");
