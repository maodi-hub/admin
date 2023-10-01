
import type { TableType } from "../type";
import type { PaginationType } from "@/components/global/m_pagination";

import { ref, shallowRef } from "vue";

import { usePagination } from "@/components/global/m_pagination";

export const useTable = (config: TableType, pagination_config?: Partial<PaginationType> ) => {
  const { handleLoadData, handleProcseeData, isDeepReactive } = config;

  const table_data = isDeepReactive ? ref<any[]>([]) : shallowRef<any[]>([]);
  const loading = ref(false);
  const { pagination, handleSetPagenation } = usePagination(pagination_config);

  const handleFetchData = async (param = {}) => {
    if (!handleLoadData) return;

    loading.value = true;
    table_data.value = [];
    try {
      if (!handleLoadData) return;

      let { data, code }: ResultData = await handleLoadData(param);
      if (code != 0) throw null;

      data = handleProcseeData ? handleProcseeData(data) : data;

      table_data.value = data;
    } catch (error: any) {
      // do something
    } finally {
      loading.value = false;
    }
  };

  handleFetchData();

  return {
    table_data,
    loading,
    pagination,
    handleFetchData,
    handleSetPagenation
  };
};
