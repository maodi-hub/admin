interface MTextareaPropType {
  modelValue?: any;
  disabled?: boolean;
}

interface MTextareaEmitType {
  (e: "update:modelValue", v: MTextareaPropType["modelValue"]): void
}

type MTextAreaInstance = InstanceType<typeof import("./textarea.vue")["default"]>;

export type {
  MTextAreaInstance,
  MTextareaPropType,
  MTextareaEmitType
}