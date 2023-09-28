import type { RouteLocationNormalizedLoaded } from "vue-router";

export interface GlobalState {
  token: string;
  size: "large" | "small" | "default" | "";
  language: string;
}

export interface LoadingState {
  fullLoading: boolean;
  localeLoading: boolean;
}

export interface MenuState {
  default_menu: Menu.MenuOptions[];
  collapse: boolean;
  menu_tags: (Pick<
    RouteLocationNormalizedLoaded,
    "path" | "name" | "query" | "params"
  > &
    Partial<Pick<Menu.MenuOptions, "meta" | "redirect">>)[];
  exclude_keep_route: string[];
  permissions: string[];
  reload: boolean;
}

export interface UserState {
  info: Omit<Auth.LoginVO, "user"> & Auth.LoginVO["user"];
}
