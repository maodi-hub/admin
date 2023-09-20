import { defineStore } from "pinia";

import { LOADING } from "./const";

import { LoadingState } from "../interface";

export const useLoadingStore = defineStore({
	id: LOADING,
	state: (): LoadingState => ({
		fullLoading: false,
		localeLoading: false
	}),
	getters: {},
	actions: {
		setLoading(payload: boolean, state: keyof LoadingState) {
      this[state] = payload;
    }
	}
});