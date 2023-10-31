import type { MTablePropType } from "../type";

import { shallowRef, ref, toRaw } from "vue";
import { debounce } from "lodash";

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
  const { pagination, handleSetPagenation, handleResetPagination } =
    usePagination();

  const loading = ref(false);
  const table_data = !isDeepReactive ? shallowRef<CP[]>([]) : ref<CP[]>([]);

  const {
    afterResponse,
    beforeRequest,
    requestFn,
    immediate,
    requestDebounce,
  } = requestOptions;

  const handleGetData = debounce(async (...arg: any) => {
    if (!requestFn) return;

    loading.value = true;
    try {
      const param: P = beforeRequest
        ? beforeRequest(arg, toRaw(pagination))
        : arg;

      const res = await requestFn(param);

      const data = (
        afterResponse ? afterResponse(res, handleSetPagenation) : res
      ) as CP[];

      table_data.value = [];
      table_data.value = data;
    } catch (err) {
      table_data.value = [];
    } finally {
      loading.value = false;
    }
  }, requestDebounce);

  if (immediate) handleGetData(searchParam);

  return {
    table_data,
    loading,
    handleGetData,
    handleSetPagenation,
    handleResetPagination,
    pagination
  };
}
