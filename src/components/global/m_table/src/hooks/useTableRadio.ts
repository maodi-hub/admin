import type { SelectionHookOptionType } from "../type";

import {
  ref,
  watchPostEffect,
  unref,
} from "vue";

export function useTableRadio<CP extends Record<string, any>>(
  options: SelectionHookOptionType = { dataKey: "id" }
) {

  const { dataKey } = options;

  const radio_id = ref();

  function getRadioData(id: any, table_data: CP[]) {
    if (!id) return;

    const data = table_data.find(
      (item) => item[dataKey] == id
    );
    if (data) return data;
  }

  return {
    radio_id,
    getRadioData,
  };
}
