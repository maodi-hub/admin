import { reactive } from "vue";

import type { PaginationType } from "../type";
import { isNumber } from "lodash";

export const usePagination = (config?: Partial<PaginationType>) => {
  const DEFAULT_PAGINATION = {
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 50, 100],
    total: 0,
    layout: ["sizes", "prev", "pager", "next", "jumper", "total"],
  };
  const pagination = reactive<PaginationType>(Object.assign({}, DEFAULT_PAGINATION, config));
  
  const handleSetPagenation = <K extends keyof PaginationType>(
    payload: Partial<PaginationType>
  ) => {
    for (let [key, val] of Object.entries(payload)) {
      if (!pagination.hasOwnProperty(key) || !isNumber(val)) continue;
      pagination[key as K] = val as PaginationType[K];
    }
  };

  return {
    pagination,
    handleSetPagenation
  }
}