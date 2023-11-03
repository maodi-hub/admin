import type { UnwrapRef } from "vue";
import type { SelectionHookOptionType } from "../type";

import { computed, ref, unref } from "vue";

export function useTableSelection<
  CP extends Record<string, any>,
  K extends keyof CP = keyof CP
>(options: SelectionHookOptionType = { dataKey: "id" }) {
  const { dataKey } = options;

  const selected_data_list = ref<CP[]>([]);

  const selected_ids = computed<CP[K][]>(() => {
    const list = unref(selected_data_list).map((item) => {
      return item[dataKey];
    });
    return list;
  });

  const addSelectionData = (value: UnwrapRef<CP[]>) => {
    selected_data_list.value = value;
  };

  const clearSelectionData = () => {
    selected_data_list.value = [];
  };

  return {
    selected_ids,
    selected_data_list,
    addSelectionData,
    clearSelectionData,
  };
}
