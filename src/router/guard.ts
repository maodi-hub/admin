import $router from "@/config/router";
import nprogress from "@/config/nprogress";
import { AxiosCanceler } from "@/api/helper/axiosCancel";
import { initRouter, resetRouter } from "./routes";
import { check_app_version } from "@/utils/lib";

import { useGlobalStore } from "@/store/modules/global";
import { useMenuStore } from "@/store/modules/menu";

const axiosCancel = new AxiosCanceler();

const WHITE_LIST = ["/login"];

$router.beforeEach(async (to, from) => {
  if (!check_app_version()) return false;

  const $global = useGlobalStore();
  const $menu = useMenuStore();

  nprogress.start();
  axiosCancel.removeAllPending();

  if (to.path == "/login") {
    if ($global.token) return from.fullPath;
    resetRouter($router);
    return true;
  }

  if (WHITE_LIST.includes(to.path)) {
    return true;
  }

  if (!$global.token) {
    return { replace: true, path: "/login" };
  }

  if ($global.token && !$menu.default_menu.length) {
    await initRouter($router);

    return { ...to, replace: true };
  }
  return true;
});

$router.afterEach((to, from, failure) => {
  nprogress.done();
  document.title = to.meta.title as string;
});

$router.onError(() => {
  nprogress.done();
});
