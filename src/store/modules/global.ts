import { defineStore } from "pinia";

import { GLOBAL } from "./const";

import type { GlobalState } from "../interface";

export const useGlobalStore = defineStore({
	id: GLOBAL,
	state: (): GlobalState => ({
		token: "",
		size: 'default'
	}),
	getters: {},
	actions: {
		setToken(payload: string) {
      this.token = payload;
    },
		setSize(payload: GlobalState['size']) {
			this.size = payload;
		}
	},
	persist: true
});