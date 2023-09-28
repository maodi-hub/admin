import { reactive, toRefs } from "vue";

import request from "@/api/config";

import type { UseTableHookConfigType, TableType } from "../type";

interface DefaultProps {
  table_config: Pick<TableType, "handleLoadData" | "handleProcseeData">;
}

export const useTable = <D = any>($props: DefaultProps) => {
  const config = reactive<UseTableHookConfigType<D>>({
    table_data: [],
    loading: false,
    pagination: {
      currentPage: 0,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50, 100],
      total: 1000,
      layout: ["sizes", "prev", "pager", "next", "jumper", "total"],
    },
  });

  const handleFetchData = async (param = {}) => {
    const {
      table_config: { handleLoadData, handleProcseeData },
    } = $props;
    if (!handleLoadData) return undefined;

    try {
      config.loading = true;
      const requestFn = getRequestFn(handleLoadData);
      if (!requestFn) return;

      let { data, code }: ResultData = await requestFn(param);
      if (code != 0) throw null;

      data = handleProcseeData ? handleProcseeData(data) : data;

      config.table_data = data;
    } catch (error: any) {
      // do something
    } finally {
      config.loading = false;
    }
  };

  const getRequestFn = (
    payload: DefaultProps["table_config"]["handleLoadData"]
  ) => {
    if (!payload) return;
    if (typeof payload == "function") return payload;
    return () => request.send(payload);
  };

  const handleSetPagenation = (
    payload: Partial<UseTableHookConfigType["pagination"]>
  ) => {
    for (let [key, val] of Object.entries(payload)) {
      if (!config.pagination.hasOwnProperty(key)) continue;

      const keyType = typeof config.pagination[key];
      let newVal: number | (number | string)[];
      if (keyType == "object") {
        newVal = val ?? [];
      } else {
        newVal = val ?? 0;
      }
      config.pagination[key] = newVal;
    }
  };

  handleFetchData();

  return {
    ...toRefs(config),
    handleFetchData,
    handleSetPagenation,
  };
};
