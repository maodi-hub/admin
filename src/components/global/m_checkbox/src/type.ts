import type {
  OptionProps,
  EnumOptionType,
} from "@/shared/type/common";

interface MCheckboxPropType<OP = any> {
  modelValue?: any;
  disabled?: boolean;
  immediate?: boolean;
  clearable?: boolean;
  props?: OptionProps;
  enumOption?: EnumOptionType<OP>;
}

interface MCheckboxEmitType {
  (e: "update:modelValue", v: MCheckboxPropType["modelValue"]): void;
}

type MCheckboxInstance = GenericComponentInstanceType<
  typeof import("./checkbox.vue")["default"]
>;

export type { MCheckboxInstance, MCheckboxPropType, MCheckboxEmitType };
