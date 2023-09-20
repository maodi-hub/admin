import { defineStore } from "pinia";

import { HOME } from "@/router/routes";

import { MENU } from "./const";

import { AUTH } from "@/api";

import { flatRouter, flatRouterToPathForBreadCrumb } from "@/utils/lib/router";

import type { MenuState } from "../interface";

export const useMenuStore = defineStore({
  id: MENU,
  state: (): MenuState => ({
    default_menu: [],
    collapse: false,
    menu_tags: [
      { path: "/home", name: "home", query: {}, params: {}, meta: HOME.meta },
    ],
    exclude_keep_route: [],
    reload: true,
  }),
  getters: {
    menu_list(state) {
      return [HOME, ...state.default_menu] as Menu.MenuOptions[];
    },
    include_keep_route(state) {
      const include_route = flatRouter(state.default_menu)
        .filter(({ meta }) => meta?.isKeepAlive)
        .map(({ name }) => name);
      state.exclude_keep_route = state.exclude_keep_route.filter((name) =>
        include_route.includes(name)
      );
      return include_route;
    },
    flat_routes(state) {
      const routes = flatRouter(state.default_menu).reduce(
        (pre, cur) => ((pre[cur.path] = cur), pre),
        {} as Record<string, Menu.MenuOptions>
      );
      return (path: string) => routes[path];
    },
    flat_bread_list(state) {
      const bread_list = flatRouterToPathForBreadCrumb(
        state.default_menu
      ).reduce(
        (pre, cur) => ((pre[cur[cur.length - 1]] = cur), pre),
        {} as Record<string, string[]>
      );
      return (path: string) => bread_list[path] || [];
    },
  },
  actions: {
    setMenu(payload: Menu.MenuOptions[]) {
      const routes_length = payload.length;
      this.default_menu = payload;
      return !!routes_length;
    },
    setMenuTag(payload: MenuState["menu_tags"][0]) {
      const isExist = this.menu_tags.findIndex(
        ({ name }) => name == payload.name
      );
      if (isExist != -1) {
        this.menu_tags[isExist] = payload;
        return;
      }
      payload.meta?.isKeepAlive && this.delUnKeepRoute(payload.name as string);
      this.menu_tags.push(payload);
    },
    delMenuTag(payload: MenuState["menu_tags"][0], cur_route_path?: string) {
      const isExist = this.menu_tags.findIndex(
        ({ name }) => name == payload.name
      );
      if (isExist == -1) return -1;

      this.menu_tags.splice(isExist, 1);
      payload.meta?.isKeepAlive && this.setUnKeepRoute(payload.name as string);
      const is_active_route = payload.path == cur_route_path;
      if (!is_active_route) return -1;

      return isExist;
    },
    resetMenuTag(active_route?: string) {
      if (this.menu_tags.length <= 1) return;

      const need_rm_tags = this.menu_tags.slice(1, this.menu_tags.length);
      need_rm_tags.forEach((tag) => this.delMenuTag(tag, active_route));
      this.menu_tags = [
        { path: "/home", name: "home", query: {}, params: {}, meta: HOME.meta },
      ];
    },
    getCurrentMenuTag(payload: string) {
      const route = this.menu_tags.find(({ path }) => path == payload);
      if (!route) return false;
      return route;
    },
    setUnKeepRoute(name: string) {
      const is_exist = this.include_keep_route.includes(name);
      if (!is_exist) return;
      this.exclude_keep_route = [
        ...new Set([...this.exclude_keep_route, name]),
      ];
    },
    delUnKeepRoute(name: string) {
      const index = this.exclude_keep_route.findIndex((item) => item == name);
      if (index == -1) return;
      this.exclude_keep_route.splice(index, 1);
    },
    resetReloadPage(payload: boolean) {
      this.reload = payload;
    },
    setCollapse(payload: boolean) {
      this.collapse = payload;
    },
    async getMenuWithReq() {
      const menu = await AUTH.getAuthMenu();
      return menu;
    },
  },
  persist: {
    paths: ["menu_tags", "exclude_keep_route", "collapse"],
  },
});
