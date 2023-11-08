interface MSelectPropType<OP = any> {
  modelValue?: any;
  disabled?: boolean;
  immediate?: boolean;
  clearable?: boolean;
  mutiple?: boolean;
  props?: {
    label: string | number;
    value: string | number;
    disabled?: string | number;
  };
  enumOption?: OP[] | ((...arg: any[]) => Promise<OP[]> | OP[]);
}

interface MSelectEmitType {
  (e: "update:modelValue", v: MSelectPropType["modelValue"]): void;
}

type MSelectInstance = GenericComponentInstanceType<
  typeof import("./select.vue")["default"]
>;

export type { MSelectInstance, MSelectPropType, MSelectEmitType };
