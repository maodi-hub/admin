import type { MTablePropType } from "../type";

import { shallowRef, ref, toRaw } from "vue";
import { debounce, isArray } from "lodash";

import { usePagination } from "@/components/global/m_pagination";

interface RequestOptionsType<P, CP, BR>
  extends Pick<
    MTablePropType<P, CP, BR>,
    | "afterResponse"
    | "beforeRequest"
    | "requestFn"
    | "immediate"
    | "requestDebounce"
  > {}

export function useTableData<P, CP, BR>(
  requestOptions: RequestOptionsType<P, CP, BR>,
  isDeepReactive: MTablePropType["isDeepReactive"],
  searchParam: MTablePropType["searchParam"]
) {
  const {
    pagination,
    handleSetPagenation,
    handleResetPagination,
    onCurrentChange,
    onSizeChange,
  } = usePagination({
    onSizeChangeAfter() {
      handleDebounceData(searchParam);
    },
    onCurrentChangeAfter() {
      handleDebounceData(searchParam);
    },
  });

  const loading = ref(false);
  // const table_data = !isDeepReactive ? shallowRef<CP[]>([]) : ref<CP[]>([]);
  const table_data = ref<CP[]>([]);


  const {
    afterResponse,
    beforeRequest,
    requestFn,
    immediate,
    requestDebounce,
  } = requestOptions;

  const handleGetData = async (...arg: any) => {
    if (!requestFn) return;

    loading.value = true;
    try {
      console.log("requesting...");
      const param: P = beforeRequest
        ? beforeRequest(arg, toRaw(pagination))
        : arg;

      const res = await requestFn(param);

      const data = (
        afterResponse ? afterResponse(res, handleSetPagenation) : res
      ) as CP[];

      if (!isArray(data)) {
        throw new Error("Table data is expected to be an array!");
      }

      table_data.value = [];
      table_data.value = data;
    } catch (err) {
      console.log("table request err ... ", err);
      table_data.value = [];
    } finally {
      loading.value = false;
    }
  };

  const handleDebounceData = debounce(handleGetData, requestDebounce);

  if (immediate) handleGetData(searchParam);

  return {
    loading,
    table_data,
    handleGetData,
    handleDebounceData,
    handleSetPagenation,
    handleResetPagination,
    pagination,
    onCurrentChange,
    onSizeChange,
  };
}
