import type { MFormItemPropType } from "./type";

export function filterFormItemsToParam<SP>(form_items: MFormItemPropType[]) {
  return form_items.reduce((pre, cur) => {
    const { prop, defaultValue, _children } = cur;
    if (_children || !prop ) return pre;
    pre[prop] = defaultValue ?? void 0;
    return pre
  }, {} as Record<string, any>) as SP;
}