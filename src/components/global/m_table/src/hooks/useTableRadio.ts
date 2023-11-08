import type { SelectionHookOptionType } from "../type";

import { ref, watchPostEffect, unref } from "vue";

export function useTableRadio<CP extends Record<string, any>>(
  options: SelectionHookOptionType = { dataKey: "id" }
) {
  const { dataKey } = options;

  const radio_id = ref();

  function getRadioData(id: any, table_data: CP[]) {
    if (!id) return;

    const data = table_data.find((item) => item[dataKey] == id);
    if (data) return data;
  }

  function setRadio(data?: CP) {
    if (!data) {
      radio_id.value = void 0;
      return;
    }
    radio_id.value = data[dataKey];
  }
  return {
    radio_id,
    setRadio,
    getRadioData,
  };
}
