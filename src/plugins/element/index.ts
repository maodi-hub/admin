import type { App } from "vue";

import * as Icons from "@element-plus/icons-vue";

export default {
  init(app: App, ...options: any[]) {
    for (let [name, component] of Object.entries(Icons)) {
      app.component(name, component);
    }
  },
};
