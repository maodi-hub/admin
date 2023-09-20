import { ElMessage } from "element-plus";

import { setDynamicRouter } from "@/utils/lib/router";

import { useMenuStore } from "@/store/modules/menu";

import type { RouteRecordRaw, Router } from "vue-router";

export const HOME: RouteRecordRaw = {
  path: "/home",
  name: "home",
  component: () => import("@/views/home/index.vue"),
  meta: {
    icon: "HomeFilled",
    title: "首页",
    activeMenu: "",
    isLink: "",
    isHide: false,
    isFull: false,
    isAffix: false,
    isKeepAlive: false,
  },
};

export const DEFAULT: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      icon: "",
      activeMenu: "",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: false,
    },
  },
  {
    path: "/layout",
    name: "layout",
    redirect: "/home",
    component: () => import("@/layout/default/index.vue"),
    children: [HOME],
  },
];

export const NOT_FOUND: RouteRecordRaw[] = [
  {
    path: "/not_found",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
  {
    // 找不到路由重定向到404页面
    path: "/:pathMatch(.*)",
    component: () => import("@/views/404/index.vue"),
  },
];

export async function initRouter($router: Router) {
  try {
    const $menu = useMenuStore();
    const menu_list = await $menu.getMenuWithReq();
    await setDynamicRouter(menu_list);
    $menu.setMenu(menu_list);
  } catch (e) {
    ElMessage.error("路由设置出错");
    $router.replace("/login");
  }
}

export function resetRouter($router: Router) {
  const $menu = useMenuStore();
  const menu_list = $menu.default_menu;
  menu_list.forEach((route) => {
    const route_name = route.name;
    if (route_name && $router.hasRoute(route_name))
      $router.removeRoute(route_name);
  });
}
