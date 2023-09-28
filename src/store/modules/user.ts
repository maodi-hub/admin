import { defineStore } from "pinia";

import { USER } from "./const";

import { UserState } from "../interface";

export const useUserStore = defineStore({
  id: USER,
  state: (): UserState => ({
    info: {
      id: 0,
      createdAt: "",
      updatedAt: "",
      username: "",
      password: "",
      nickName: "",
      roleId: 0,
      status: 0,
      isPhone: 0,
      isBankCard: 0,
      deptId: 0,
      googleAuthKey: "",
      token: "",
      expiresAt: 0,
    },
  }),
  getters: {},
  actions: {
    setUserInfo(payload: UserState["info"]) {
      this.info = payload;
    },
    getUserInfoByKey<K extends keyof UserState["info"]>(payload: K) {
      return this.info[payload] as UserState["info"][K];
    },
  },
});
