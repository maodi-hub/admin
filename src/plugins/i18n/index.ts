import type { App } from "vue";

import i18n from "@/config/i18n";

export default {
  init(app: App, ...options: any[]) {
    app.use(i18n, ...options);
  }
}