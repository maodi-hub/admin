import type { FormRules } from "element-plus";
import type { Component, VNode } from "vue";

interface BaseType {
  prop: string;
  label?: string;
  default?: string;
  modifer?: string;
  rule?: FormRules[keyof FormRules];
  disabled?: boolean
}

type RenderSlotType = (...arg: any[]) => VNode;

interface BaseInputType extends BaseType {
  maxlength?: string | number;
  minlength?: string;
  placeholder?: string;
  showWordLimit?: boolean;
  formatter?: (value: string | number) => string;
}

interface InputType extends BaseInputType {
  el_type: "input";
  type: "text";
  prefixIcon?: string | Component;
  suffixIcon?: string | Component;
}

interface TextAreaType extends BaseInputType {
  el_type: "input";
  type: "textarea";
}

interface FormBaseConfigType {
  labelWidth: string | number;
  labelPosition: "top" | "left" | "right";
  inline: boolean;
  labelSuffix: string;
  hideRequiredAsterisk: boolean;
  requireAsteriskPosition: "left" | "right";
  size: "default" | "large" | "small";
}

interface FormConfigPropType {
  base_config?: Partial<FormBaseConfigType>;
  params?: Record<string, any>;
  formItems?: (InputType | TextAreaType)[];
}

export type { FormConfigPropType, TextAreaType, InputType, RenderSlotType };
