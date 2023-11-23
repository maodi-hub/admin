import type { MFormItemPropType } from "../type";

import { reactive, watch } from "vue";

import { filterFormItemsToParam } from "../utils";

export function useForm<
  IP extends Record<string, any>,
  SP extends Record<string, any>
>(initForm: IP, form_items: MFormItemPropType[]) {
  const form_param = reactive<SP & IP>(initForm as SP & IP);

  const search_param = filterFormItemsToParam<SP>(form_items, initForm);

  Object.entries(search_param).forEach(([key, value]) => {
    form_param[key as keyof SP] = value;
  });

  console.log(form_param);
  watch(form_param, (v) => {
    console.log(v);
  });

  return {
    form_param,
  };
}
