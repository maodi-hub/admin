import type { SelectionPropType } from "../type";

import { ref, computed } from "vue";

export function useSelection($props: Pick<SelectionPropType, 'filterMethod' | 'remoteMethod' | "optionEnumFn">) {
  const loading = ref(false);
  const option = ref<any[]>([]);

  const handleFetchData = async () => {
    
  }

  return {
    loading,
    option,
    handleFetchData
  }
}