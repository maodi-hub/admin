import { reactive, ref, shallowRef, toRefs } from "vue";

import request from "@/api/config";

import type { UseTableHookConfigType, TableType, PaginationType } from "../type";

export const useTable = (config: TableType) => {

  const { handleLoadData, handleProcseeData, isDeepReactive } = config;
  // const config = reactive<UseTableHookConfigType<D>>({
  //   table_data: [],
  //   loading: false,
  //   pagination: {
  //     currentPage: 0,
  //     pageSize: 10,
  //     pageSizes: [10, 20, 30, 50, 100],
  //     total: 1000,
  //     layout: ["sizes", "prev", "pager", "next", "jumper", "total"],
  //   },
  // });

  const table_data = isDeepReactive ? ref<any[]>([]) : shallowRef<any[]>([]);
  const loading = ref(false);
  const pagination = reactive<PaginationType>({
        currentPage: 0,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50, 100],
        total: 1000,
        layout: ["sizes", "prev", "pager", "next", "jumper", "total"],
      })

  const handleFetchData = async (param = {}) => {
    if (!handleLoadData) return;

    loading.value = true;
    table_data.value = [];
    try {

      const requestFn = getRequestFn(handleLoadData);
      if (!requestFn) return;

      let { data, code }: ResultData = await requestFn(param);
      if (code != 0) throw null;

      data = handleProcseeData ? handleProcseeData(data) : data;

      table_data.value = data;
    } catch (error: any) {
      // do something
    } finally {
      loading.value = false;
    }
  };

  const getRequestFn = (
    payload: TableType['handleLoadData']
  ) => {
    if (!payload) return;
    if (typeof payload == "function") return payload;
    return () => request.send(payload);
  };

  const handleSetPagenation = <
    K extends keyof PaginationType
  >(
    payload: Partial<PaginationType>
  ) => {
    for (let [key, val] of Object.entries(payload)) {
      if (!pagination.hasOwnProperty(key)) continue;
      pagination[key as K] =
        val as PaginationType[K];
    }
  };

  handleFetchData();

  return {
    table_data,
    loading,
    pagination,
    handleFetchData,
    handleSetPagenation,
  };
};
