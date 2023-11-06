interface MSelectPropType<OP = any> {
  modelValue?: any;
  disabled?: boolean;
  immediate?: boolean;
  trigger?: "blur" | "focus";
  props?: {
    label: string | number;
    value: string | number;
    disabled?: string | number;
  };
  enumOptionFn: (...arg: any[]) => Promise<OP[]> | OP[];
}

interface MSelectEmitType {
  (e: "update:modelValue", v: MSelectPropType["modelValue"]): void;
}

export type { MSelectPropType, MSelectEmitType };
