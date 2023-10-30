import { reactive } from "vue";

import type { PaginationType } from "../type";
import { isNil } from "lodash";

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
      if (!pagination.hasOwnProperty(key) || isNil(val)) continue;
      pagination[key as K] = val as PaginationType[K];
    }
  };

  const handleResetPagination = () => {
    handleSetPagenation(DEFAULT_PAGINATION);
  }

  return {
    pagination,
    handleSetPagenation,
    handleResetPagination
  }
}