import type { App, Directive } from "vue";

function getAllDirectives() {
  const directives = import.meta.glob("./src/*.ts", { eager: true }) as MetaGlobTypeWithDefault<Directive>;
  const orders: Record<string, Directive>  = {};
  for (let [u, di] of Object.entries(directives)) {
    const key = u.slice(6, -3);
    orders[key] = di.default;
  }
  return orders;
}

export default {
  install(app: App) {
    const directives = getAllDirectives();
    for (let [name, directive] of Object.entries(directives)) {
      app.directive(name, directive);
    }
  }
}
