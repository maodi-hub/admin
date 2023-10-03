import type { TableType } from "../type";
import type { PaginationType } from "@/components/global/m_pagination";

import { ref, shallowRef } from "vue";
import { debounce } from "lodash";

import { usePagination } from "@/components/global/m_pagination";

export const useTable = (
  config: TableType,
  pagination_config?: Partial<PaginationType>
) => {
  const { handleLoadData, handleProcseeData, isDeepReactive } = config;

  const table_data = isDeepReactive ? ref<any[]>([]) : shallowRef<any[]>([]);
  const loading = ref(false);
  const { pagination, handleSetPagenation } = usePagination(pagination_config);

  const handleFetchData = debounce(async (param = {}) => {
    if (!handleLoadData) return;

    loading.value = true;
    table_data.value = [];
    try {
      console.log("requesting...");
      let res = await handleLoadData(param);

      const data = handleProcseeData
        ? handleProcseeData(res, handleSetPagenation)
        : res;

      table_data.value = data;
    } catch (error: any) {
      // do something
    } finally {
      loading.value = false;
    }
  }, 300);

  return {
    table_data,
    loading,
    pagination,
    handleFetchData,
    handleSetPagenation,
  };
};
