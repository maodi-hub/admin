import { ElInput } from "element-plus";

import type { FormRules } from "element-plus";

type ElInputType = RemoveReadonly<InstanceType<typeof ElInput>["props"]>;

interface InputType extends ElInputType {
  type: "input";
  rule?: FormRules[keyof FormRules];
}

export type { InputType };
