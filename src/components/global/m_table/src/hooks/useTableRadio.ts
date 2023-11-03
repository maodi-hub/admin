import type { UnwrapRef, Ref } from "vue";
import type { SelectionHookOptionType } from "../type";

import {
  ref,
  watch,
  watchPostEffect,
  provide,
  unref,
  getCurrentInstance,
} from "vue";

import { RADIO_KEY } from "../constant";

export function useTableRadio<CP extends Record<string, any>>(
  table_data: Ref<UnwrapRef<CP[]>>,
  options: SelectionHookOptionType = { dataKey: "id" }
) {
  const $this = getCurrentInstance();

  if (!$this) throw new Error("this hooks need setup enviroment");

  const { dataKey } = options;

  const radio_id = ref();
  const radio_data = ref<CP>();
  provide(RADIO_KEY, radio_id);

  function getRadioData(id: any) {
    if (!id) return;

    const data = unref(table_data).find(
      (item) => item[dataKey] == unref(radio_id)
    );
    if (data) return data;
  }

  function setRadioData(data?: CP) {
    radio_data.value = data;
  }

  watchPostEffect(() => {
    setRadioData(getRadioData(unref(radio_id)));
  });

  watch(radio_id, (n) => {
    $this.emit("radioChange", getRadioData(n), unref(radio_data));
  });
  return {
    radio_data,
    radio_id,
    getRadioData,
    setRadioData,
  };
}
