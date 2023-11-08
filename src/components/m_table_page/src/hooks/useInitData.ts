import type { MTablePagePropType } from "../type";

import { ref, shallowRef, toRaw, nextTick } from "vue";
import { debounce, isArray } from "lodash";

import type { PaginationType } from "@/components/global/m_pagination";

interface RequestOptionsType<P, CP, BR>
  extends Pick<
    MTablePagePropType<P, CP, BR>,
    "afterResponse" | "beforeRequest" | "requestFn" | "requestDebounce"
  > {}

export function useInitData<P, CP, BR>(
  requestOptions: RequestOptionsType<P, CP, BR>,
  isDeepReactive: MTablePagePropType<P, CP, BR>["isDeepReactive"],
  handleSetPagenation: (payload: Partial<PaginationType>) => void
) {
  const loading = ref(false);
  const table_data = !isDeepReactive ? shallowRef<CP[]>([]) : ref<CP[]>([]);

  const { afterResponse, beforeRequest, requestFn, requestDebounce } =
    requestOptions;

  const handleGetData = async (...arg: any) => {
    if (!requestFn) return;
    await nextTick();
    loading.value = true;
    try {
      console.log("requesting...", arg);
      const param: P = beforeRequest ? beforeRequest(arg) : arg;

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

  return {
    loading,
    table_data,
    handleGetData,
    handleDebounceData,
  };
}
