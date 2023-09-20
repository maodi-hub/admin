import { createRouter, createWebHistory } from 'vue-router';

import { DEFAULT, NOT_FOUND } from "@/router/routes";

const router = createRouter({
  history: createWebHistory(),
  routes: [...DEFAULT, ...NOT_FOUND],
})

export default router;