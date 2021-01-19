import { App } from "vue";
import * as plugin from "@/plugin/index";
import * as utils from "@/utils/index";

const globalRegister = (app: App) => {
  // 获取common下的组件名称
  const requireComponent = require.context(
    "@/components/common",
    true,
    /[a-z0-9]+\.(jsx?|vue?|tsx)$/i
  );

  // 根据common下组件名称全局注册组件
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = componentConfig.default.name;
    if (componentName) {
      app.component(componentName, componentConfig.default || componentConfig);
    }
  });

  // 按需引入element-plus组件
  plugin.plugins.forEach((plugin: any) => {
    app.use(plugin);
  });
  plugin.components.forEach((component: any) => {
    app.component(component.name, component);
  });

  // 挂载全局方法
  app.config.globalProperties.$utils = utils;
};

export default globalRegister;
