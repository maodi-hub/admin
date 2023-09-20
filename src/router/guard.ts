import $router from "@/config/router";
import nprogress from '@/config/nprogress'
import { AxiosCanceler } from '@/api/helper/axiosCancel';
import { initRouter, resetRouter } from "./routes";
import { check_app_version } from "@/utils/lib";

import { useGlobalStore  } from "@/store/modules/global";
import { useMenuStore } from "@/store/modules/menu";

const axiosCancel = new AxiosCanceler();

const WHITE_LIST = ['/login'];

$router.beforeEach(async (to, from, next) => {
  if (!check_app_version()) return next(false);

  const $global = useGlobalStore();
  const $menu = useMenuStore();

  nprogress.start();
  axiosCancel.removeAllPending();

  if (to.path == "/login") {
    if ($global.token) return next(from.fullPath);
    resetRouter($router);
    return next();
  }

  if (WHITE_LIST.includes(to.path)) {
    next();
    return;
  }

  if (!$global.token) {
    next({ replace: true, path: "/login" });
    return;
  }

  if ($global.token && !$menu.default_menu.length) {
    await initRouter($router);
    next({ ...to, replace: true });
    return 
  }
  next()


});

$router.afterEach((to, from, failure) => {
  nprogress.done();
  document.title = to.meta.title as string
});

$router.onError(() => {
  nprogress.done();
})
