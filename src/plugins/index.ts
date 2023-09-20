import type { App } from "vue";

export default function initPlugins(app: App) {

  const plugins = import.meta.glob("./*/index.ts", { eager: true }) as Record<
    string,
    { default: { init(app: App, ...options: any[]): void } }
  >;
  
  Object.values(plugins).forEach((plugin) => plugin.default.init(app));
}
