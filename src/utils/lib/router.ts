import { isArray, isFunction, isString } from "../is";
import $router from "@/config/router";
import { ElMessage } from "element-plus";

import type { RouteRecordRaw } from "vue-router";

export function parseDynamicRouter(payload: Menu.MenuOptions[]) {
  const allPages = import.meta.glob("@/views/**/*.vue");

  const routes = [...payload];
  return routes.map((item) => {
    const { meta, path, component, name, redirect } = item;
    const route: Menu.MenuOptions = {
      path,
      name,
      meta,
      redirect,
    };

    if (!component) return route;

    if (isString(component)) {
      route.component = allPages["/src/views" + component + ".vue"];
      return route;
    }

    if (isFunction(component)) {
      route.component = component;
      return route;
    }

    return route;
  }) as RouteRecordRaw[];
}

export function flatRouter(payload: Menu.MenuOptions[]) {
  const routes = [...payload];
  return routes.reduce((pre, cur) => {
    const cur_route = {...cur};
    let cur_routes = [...pre, cur_route];
    const children = cur_route.children;
    isArray(children) &&
      children.length &&
      (cur_routes = [...pre, cur_route, ...flatRouter(children)]);
    return cur_routes;
  }, [] as Menu.MenuOptions[]);
}

export function flatRouterToPathForBreadCrumb(payload: Menu.MenuOptions[], group: string[] = []) {
  const routes = [...payload];
  let result: string[][] = [];
  for (let item of routes) {
    let paths = [...group, item.path];
    result.push(paths);
    if (item.children && item.children.length > 0) {
      let children = flatRouterToPathForBreadCrumb(item.children, paths);
      result = result.concat(children);
    }
  }
  return result;
}

export async function setDynamicRouter(payload: Menu.MenuOptions[]) {
  let isFlat = true;
  try {
    const menu_list = payload;
    const flatRoutes = flatRouter(menu_list);
    const parsedRoutes = parseDynamicRouter(flatRoutes);

    parsedRoutes.forEach((route) => {
      const r = { ...route };
      delete r.children
      if (r.meta?.isFull) {
        $router.addRoute(r);
        return;
      }
      $router.addRoute("layout", r);
    });
  } catch (err) {
    ElMessage.error("路由添加失败");
    $router.replace('/')
    isFlat = false;
  }
  return isFlat;
}
