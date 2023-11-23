import { isNil } from "lodash";
import type { MFormItemPropType } from "./type";

export function filterFormItemsToParam<SP>(
  form_items: MFormItemPropType[],
  param: Record<string, any>
) {
  return form_items.reduce((pre, cur) => {
    const { prop, defaultValue } = cur;
    if (isNil(prop)) return pre;
    pre[prop] = defaultValue ?? param[prop];
    return pre;
  }, {} as Record<string, any>) as SP;
}
