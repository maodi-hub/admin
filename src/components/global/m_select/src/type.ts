interface MSelectPropType {
  modelValue?: any;
  disabled?: boolean;
  enumOptionFn: enumFnType;
}

interface MSelectEmitType {
  (e: "update:modelValue", v: MSelectPropType["modelValue"]): void
}

export type {
  MSelectPropType,
  MSelectEmitType
}