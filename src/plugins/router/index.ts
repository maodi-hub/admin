import type { App } from "vue";

import router from "@/config/router";

export default {
  init(app: App, ...options: any[]) {
    app.use(router);
  }
}