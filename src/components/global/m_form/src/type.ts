import type { Arrayable } from "@vueuse/core";
import type { FormItemRule, FormRules } from "element-plus";
import type { VNode } from "vue";

interface MFormPropType {
  inline?: boolean;
  labelWidth?: string;
  rules?: FormRules;
  labelSuffix?: string;
  labelPosition?: "left" | "right" | "top";
  initParam?: Record<string, any>;
  formItems?: MFormItemPropType[];
}

interface MFormItemPropType {
  uniqueKey: string;
  prop?: string;
  label?: string;
  labelWidth?: string;
  rules?: Arrayable<FormItemRule>;
  isShow?:boolean;
  defaultValue?: any;
  disabled?: boolean;
  tips?: () => VNode;
  _renderLabel?: (prop: Pick<MFormItemPropType, "label" | "tips"> & { labelSuffix: string | undefined }) => VNode;
  _renderContent?: (prop: { item: MFormItemPropType }) => VNode;
  _children?: MFormItemPropType[];
  // name: "MInput" | "MSelect" | "MTextarea" | (string & {})
  component: InputType | TextareaType | SelectType
}

interface InputType {
  name: "MInput"
}

interface TextareaType {
  name: "MTextarea"
}

interface SelectType {
  name: "MSelect"
}

type MFormInstance = InstanceType<typeof import("./form.vue")["default"]>;

export type { MFormInstance, MFormPropType, MFormItemPropType };
