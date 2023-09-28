import request from "../config";

import MENU_LIST from "@/assets/json/menu.json";

export const verify = () => {};

//  登录
export const login = (payload: Auth.LoginDTO) => {
  return request.post<Auth.LoginVO>("/base/login", payload);
};

// 退出
export const logOut = () => {
  return request.post("/sysUser/jsonInBlacklist");
};

// 获取权限列表
export const getPermission = (payload: Auth.PermissionDTO) => {
  return request.get<Auth.PermissionVO>("/sysUser/getPermissions", payload);
};

export const getAuthMenu = async () => {
  return MENU_LIST;
};
