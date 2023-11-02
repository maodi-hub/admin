

import { computed, ref, unref, UnwrapRef } from "vue";

interface Options {
  dataKey: string;
}

export function useTableSelection<
  CP extends Record<string, any>,
  K extends keyof CP = keyof CP
>(options: Options = { dataKey: "id" }) {
  const { dataKey } = options;

  const selected_data_list = ref<CP[]>([]);

  const selected_ids = computed<CP[K][]>(() => {
    const list = unref(selected_data_list).map((item) => {
      return item[dataKey] as CP[K];
    });
    return list;
  });

  const addSelectionData = (value: CP[]) => {
    selected_data_list.value = value as UnwrapRef<CP[]>;
  }

  const clearSelectionData = () => {
    selected_data_list.value = [];
  }

  return {
    selected_ids,
    selected_data_list,
    addSelectionData,
    clearSelectionData
  };
}
