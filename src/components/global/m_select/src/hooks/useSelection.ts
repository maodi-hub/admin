import type { SelectionPropType } from "../type";

import { ref, computed } from "vue";

export function useSelection($props: Pick<SelectionPropType, 'filterMethod' | 'remoteMethod' | "optionEnumFn">) {
  const { optionEnumFn } = $props;

  const loading = ref(false);
  const option = ref<any[]>([]);

  const handleFetchData = async (...arg: any[]) => {
    loading.value = true;
    option.value = [];
    try {
      if (!optionEnumFn) return;
      const data = await optionEnumFn(arg);
      option.value = data;
    } finally{
      loading.value = false
    }
  }

  return {
    loading,
    option,
    handleFetchData
  }
}