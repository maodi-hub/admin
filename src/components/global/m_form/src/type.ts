import type { Arrayable } from "@vueuse/core";
import type { FormItemRule, FormRules } from "element-plus";
import type { VNode } from "vue";

interface MFormPropType {
  inline?: boolean;
  labelWidth?: string;
  rules?: FormRules;
  labelSuffix?: string;
  labelPosition?: "left" | "right" | "top";
  searchParam?: Record<string, any>;
  formItems?: MFormItemPropType[];
}

interface MFormItemPropType {
  uniqueKey: string;
  prop: string;
  label?: string;
  labelWidth?: string;
  rules?: Arrayable<FormItemRule>;
  tips?: () => VNode;
  _renderLabel?: (prop: Pick<MFormItemPropType, "label" | "tips">) => VNode;
  _renderContent?: (prop: { item: MFormItemPropType }) => VNode;
}

type MFormInstance = InstanceType<typeof import("./form.vue")["default"]>;

export type { MFormInstance, MFormPropType, MFormItemPropType };
