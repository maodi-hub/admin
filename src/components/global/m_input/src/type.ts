interface MInputPropType {
  modelValue?: any;
  disabled?: boolean;
  type?: "text" | "number" | (string & {})
}

interface MInputEmitType {
  (e: "update:modelValue", v: MInputPropType["modelValue"]): void
}

export type {
  MInputPropType,
  MInputEmitType
}