import type { UnwrapRef } from "vue";
import type { MSelectPropType } from "../type";

import { ref, shallowRef } from "vue";
import { isFunction } from "lodash";

export function useSelect<OP extends Record<string, any>>(
  enumOption: MSelectPropType<OP>["enumOption"]
) {
  const loading = ref(false);

  const optionsList = shallowRef<OP[]>([]);

  const handleGetData = async (...arg: any[]) => {
    if (!isFunction(enumOption)) return;

    loading.value = true;
    try {
      const list = (await enumOption(arg)) as UnwrapRef<OP[]>;
      optionsList.value = [];
      optionsList.value = list;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    optionsList,
    handleGetData,
  };
}
