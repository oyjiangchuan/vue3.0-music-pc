import { App } from "vue";
// import * as plugin from "@/plugin/index";
import * as utils from "@/utils/index";

const globalRegister = (app: App) => {
  const requireComponent = require.context(
    "@/components/common",
    true,
    /[a-z0-9]+\.(jsx?|vue?|tsx)$/i
  );
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = componentConfig.default.name;
    if (componentName) {
      app.component(componentName, componentConfig.default || componentConfig);
    }
  });
  app.config.globalProperties.$utils = utils;
};

export default globalRegister;
