import { reactive } from "vue";

import type { PaginationType } from "../type";

import { isNil, omit } from "lodash";

interface ChangeOptions {
  onSizeChangeAfter?: () => void;
  onCurrentChangeAfter?: () => void;
}

const DEFAULT_PAGINATION = () => ({
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 30, 50, 100],
  total: 0,
  layout: ["sizes", "prev", "pager", "next", "jumper", "total"],
});

export const usePagination = (afterFn: ChangeOptions,config: PaginationType = DEFAULT_PAGINATION()) => {

  const { onSizeChangeAfter, onCurrentChangeAfter } = afterFn;

  const initPagenation = omit(
    config,
    "onSizeChangeAfter",
    "onCurrentChangeAfter"
  );

  const pagination = reactive<PaginationType>(initPagenation);

  const handleSetPagenation = <K extends keyof PaginationType>(
    payload: Partial<PaginationType>
  ) => {
    for (let [key, val] of Object.entries(payload)) {
      if (!pagination.hasOwnProperty(key) || isNil(val)) continue;
      pagination[key as K] = val as PaginationType[K];
    }
  };

  const handleResetPagination = () => {
    handleSetPagenation(DEFAULT_PAGINATION());
  };

  const onSizeChange = (value: number) => {
    handleSetPagenation({ pageSize: value });
    onSizeChangeAfter && onSizeChangeAfter();
  };

  const onCurrentChange = (value: number) => {
    handleSetPagenation({ currentPage: value });
    onCurrentChangeAfter && onCurrentChangeAfter();
  };

  return {
    pagination,
    handleSetPagenation,
    handleResetPagination,
    onCurrentChange,
    onSizeChange
  };
};
