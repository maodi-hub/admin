import type { FormRules } from "element-plus";
import type { Component, VNode } from "vue";
import type { SelectionPropType } from "../../m_select/src/type";

interface BaseType {
  prop: string;
  label?: string;
  default?: string;
  rule?: FormRules[keyof FormRules];
  disabled?: boolean;
  readonly?: boolean;
  size?: "default" | "large" | "size";
  tips?: string | (() => VNode);
  clearable?: boolean;
  // custom_render_item?: (props: { modelValue: any }) => VNode;
  [x: string]: any;
}

type RenderSlotType = (...arg: any[]) => VNode;

interface BaseInputType extends BaseType {
  el_type: "input";
  maxlength?: string | number;
  minlength?: string;
  placeholder?: string;
  showWordLimit?: boolean;
  formatter?: (value: string | number) => string;
}

interface InputType extends BaseInputType {
  type: "text";
  prefixIcon?: string | Component;
  suffixIcon?: string | Component;
  prefix?: RenderSlotType;
  suffix?: RenderSlotType;
  prepend?: RenderSlotType;
  append?: RenderSlotType;
}

interface TextAreaType extends Omit<BaseInputType, "size"> {
  type: "textarea";
  rows?: number;
  autosize?: boolean | { minRows: number; maxRows: number };
}

interface SelectionType extends SelectionPropType {
  el_type: "select";
  type: "selection";
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

type FormItemType = InputType | TextAreaType | SelectionType

interface FormConfigPropType {
  form_base_config?: Partial<FormBaseConfigType>;
  params?: Record<string, any>;
  formItems?: FormItemType[];
}

interface FormItemPropType {
  params: Record<string, any>
  config: FormItemType
}

export type { FormConfigPropType, FormItemPropType, TextAreaType, InputType, RenderSlotType, BaseType };
