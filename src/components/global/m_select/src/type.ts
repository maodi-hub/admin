import type {
  OptionProps,
  EnumOptionType,
} from "@/components/shared/type/common";

interface MSelectPropType<OP = any> {
  modelValue?: any;
  disabled?: boolean;
  immediate?: boolean;
  clearable?: boolean;
  mutiple?: boolean;
  props?: OptionProps;
  enumOption?: EnumOptionType<OP>;
}

interface MSelectEmitType {
  (e: "update:modelValue", v: MSelectPropType["modelValue"]): void;
}

type MSelectInstance = GenericComponentInstanceType<
  typeof import("./select.vue")["default"]
>;

export type { MSelectInstance, MSelectPropType, MSelectEmitType };
