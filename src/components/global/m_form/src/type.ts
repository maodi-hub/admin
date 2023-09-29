import type { FormRules } from "element-plus";
import type { Component, VNode } from "vue";

interface BaseType {
  prop: string;
  label?: string;
  default?: string;
  modifer?: string;
  rule?: FormRules[keyof FormRules];
  disabled?: boolean;
  readonly?: boolean;
  size?: "default" | "large" | "size";
  tips?: string | (() => VNode);
  clearable?: boolean;
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

interface SelectionType extends BaseType, Pick<InputType, 'suffixIcon' | 'prefix' | 'placeholder'> {
  el_type: "select";
  type: "selection";
  multiple?: boolean;
  valueKey?: string;
  collapseTags?: boolean;
  collapseTagsTooltip?: boolean;
  multipleLimit?: number;
  filterable?: boolean;
  allowCreate?: boolean;
  filterMethod?: () => void;
  remote?: boolean;
  remoteMethod?: () => void;
  defaultFirstOption?: boolean;
  fitInputWidth?: boolean;
  maxCollapseYags?: number;
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
  base_config?: Partial<FormBaseConfigType>;
  params?: Record<string, any>;
  formItems?: FormItemType[];
}

interface FormItemPropType {
  params: Record<string, any>
  config: FormItemType
}

export type { FormConfigPropType, FormItemPropType, TextAreaType, InputType, SelectionType, RenderSlotType, BaseType };
