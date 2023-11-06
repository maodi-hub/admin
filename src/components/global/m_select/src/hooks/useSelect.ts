import type { UnwrapRef } from "vue";
import type { MSelectPropType } from "../type";

import { ref } from "vue";

export function useSelect<OP extends Record<string, any>>(
  enumOptionFn: MSelectPropType<OP>["enumOptionFn"]
) {
  const loading = ref(false);

  const optionsList = ref<OP[]>([]);

  const handleGetData = async (...arg: any[]) => {
    if (!enumOptionFn) return;
    loading.value = true;
    try {
      const list = (await enumOptionFn(arg)) as UnwrapRef<OP[]>;
      optionsList.value = [];
      optionsList.value = list;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    optionsList,
    handleGetData,
  };
}
