import type { MTablePagePropType } from "../type";

import { ref, shallowReactive, shallowRef, toRaw, UnwrapRef } from "vue";
import { debounce, isArray } from "lodash";

import type { PaginationType } from "@/components/global/m_pagination";

interface RequestOptionsType<P, CP, BR>
  extends Pick<
    MTablePagePropType<P, CP, BR>,
    | "afterResponse"
    | "beforeRequest"
    | "requestFn"
    | "immediate"
    | "requestDebounce"
  > {}

export function useInitData<P, CP, BR>(
  requestOptions: RequestOptionsType<P, CP, BR>,
  isDeepReactive: MTablePagePropType["isDeepReactive"],
  searchParam: MTablePagePropType["searchParam"],
  pagination: PaginationType,
  handleSetPagenation: (payload: Partial<PaginationType>) => void
) {
  const loading = ref(false);
  const table_data = !isDeepReactive ? shallowRef<CP[]>([]) : ref<CP[]>([]);

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
      console.error("table request err ... ", err);
      table_data.value = [];
    } finally {
      loading.value = false;
    }
  };

  const handleDebounceData = debounce(handleGetData, requestDebounce);

  if (immediate) handleGetData({ ...searchParam, ...pagination });

  return {
    loading,
    table_data,
    handleGetData,
    handleDebounceData,
  };
}
