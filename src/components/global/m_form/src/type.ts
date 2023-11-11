import type { Arrayable } from "@vueuse/core";
import type { FormItemRule, FormRules } from "element-plus";
import type { VNode } from "vue";
import type { MInputPropType } from "../../m_input";
import type { MTextareaPropType } from "../../m_textarea";
import type { MSelectPropType } from "../../m_select";

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
  searchParam?: Record<string, any>;
  uniqueKey: string;
  prop?: string;
  label?: string;
  labelWidth?: string;
  rules?: Arrayable<FormItemRule>;
  isShow?: boolean;
  defaultValue?: any;
  tips?: () => VNode;
  _renderLabel?: (
    prop: Pick<MFormItemPropType, "label" | "tips"> & {
      labelSuffix: string | undefined;
    }
  ) => VNode;
  _renderContent?: (prop: { item: MFormItemPropType }) => VNode;
  _children?: MFormItemPropType[];
  component?: InputType | TextareaType | SelectType;
}

interface InputType extends MInputPropType {
  name: "MInput";
}

interface TextareaType extends MTextareaPropType {
  name: "MTextarea";
}

interface SelectType extends MSelectPropType {
  name: "MSelect";
}

type MFormInstance = InstanceType<typeof import("./form.vue")["default"]>;

export type { MFormInstance, MFormPropType, MFormItemPropType };
