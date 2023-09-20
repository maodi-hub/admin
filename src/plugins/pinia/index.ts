import type { App } from "vue";

import pinia from "@/config/pinia";

export default {
  init(app: App, ...options: any[]) {
    app.use(pinia);
  },
};
