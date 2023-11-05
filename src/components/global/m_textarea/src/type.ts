interface MTeatareaPropType {
  modelValue?: any;
  disabled?: boolean;
}

interface MTeatareaEmitType {
  (e: "update:modelValue", v: MTeatareaPropType["modelValue"]): void
}

export type {
  MTeatareaPropType,
  MTeatareaEmitType
}