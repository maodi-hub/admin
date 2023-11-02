import { createApp } from 'vue';
import "./style/index.less";
import "./router";
import "./langs";
import App from './App.vue';
import GlobalComponents from "./components/registerGlobal";
import Directives from "./directives";
import initPlugins from './plugins';

import type { Component } from "vue";

function bootstrap(root: Component) {
  const app = createApp(root);

  app.use(Directives);

  app.use(GlobalComponents)
  
  initPlugins(app);

  app.mount('#app');
}
bootstrap(App);

