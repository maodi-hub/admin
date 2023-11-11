import type {
  OptionProps,
  EnumOptionType,
} from "@/shared/type/common";

interface MRadioPropType<OP = any> {
  modelValue?: any;
  disabled?: boolean;
  immediate?: boolean;
  props?: OptionProps;
  enumOption?: EnumOptionType<OP>;
}

interface MRadioEmitType {
  (e: "update:modelValue", v: MRadioPropType["modelValue"]): void;
}

type MRadioInstance = GenericComponentInstanceType<
  typeof import("./radio.vue")["default"]
>;

export type { MRadioInstance, MRadioPropType, MRadioEmitType };
