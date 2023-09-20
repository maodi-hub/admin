import { defineStore } from "pinia";

import { USER } from "./const";

import { UserState } from "../interface";

export default defineStore({
	id: USER,
	state: (): UserState => ({
		info: { account: "", nick_name: "" }
	}),
	getters: {},
	actions: {
    setUserInfo(payload: Partial<UserState['info']>) {
      for (let [key, value] of Object.entries(payload)) {
        this.info[key as keyof typeof payload] = value ?? ""
      }
    }
	}
});