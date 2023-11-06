interface MInputPropType {
  modelValue?: any;
  disabled?: boolean;
  type?: "text" | "number" | (string & {})
}

interface MInputEmitType {
  (e: "update:modelValue", v: MInputPropType["modelValue"]): void
}

type MInputInstance = InstanceType<typeof import("./input.vue")['default']>;

export type {
  MInputInstance,
  MInputPropType,
  MInputEmitType
}