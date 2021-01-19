import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/style/index.scss";
import globalRegister from "./components/globalRegister";

const app = createApp(App);
app.use(store);
app.use(router);
globalRegister(app);
app.mount("#app");
