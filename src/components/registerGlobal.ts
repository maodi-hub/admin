import type { App, Component } from "vue";

function getGlobalComponents() {
  const modules = import.meta.glob("./global/*/index.ts", {
    eager: true,
  }) as Record<string, Record<string, Component>>;
  const components = Object.entries(modules)
    .map(([_, comps]) => comps)
    .reduce((pre, cur) => {
      const comps = Object.values(cur);
      return [...pre, ...comps];
    }, [] as Component[]);
  return components;
}

export default {
  install(app: App) {
    const components = getGlobalComponents();
    components.forEach((components) => {
      app.component(components.name!, components);
    })
  }
}
