import type { UnwrapRef } from "vue";
import type { EnumOptionType, OptionProps } from "@/shared/type/common";

import { computed, ref, shallowRef } from "vue";
import { isArray, isFunction } from "lodash";

export function useOptions<OP extends Record<string, any>>(
  enumOption?: EnumOptionType<OP>,
  props?: OptionProps
) {
  const loading = ref(false);

  const list = shallowRef<OP[]>([]);

  const handleGetData = async (...arg: any[]) => {
    if (!isFunction(enumOption)) return;

    loading.value = true;
    try {
      const val = (await enumOption(arg)) as UnwrapRef<OP[]>;
      list.value = [];
      list.value = val;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const optionList = computed(() => {
    if (isArray(enumOption)) {
      return enumOption;
    }
    return list.value
  })

  const propsOption = computed(() => {
    const { label = "label", value = "value", disabled = "disabled" } = props || {};
    return {
      label,
      value,
      disabled,
    };
  });

  return {
    loading,
    list,
    optionList,
    propsOption,
    handleGetData,
  };
}
