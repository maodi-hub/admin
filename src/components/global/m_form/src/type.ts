import type { Arrayable } from "@vueuse/core";
import type { FormItemRule, FormRules } from "element-plus";

interface MFormPropType {
  inline?: boolean;
  labelWidth?: string;
  rules?: FormRules;
  searchParam?: Record<string, any>;
}

interface MFormItemPropType {
  label?: string;
  labelWidth?: string;
  rules?: Arrayable<FormItemRule>
}

type MFormInstance = InstanceType<typeof import("./form.vue")["default"]>

export type {
  MFormInstance,
  MFormPropType,
}