import { Ref } from "vue";
import { BaseType, InputType } from "../../m_form/src/type";

type EnumFnType = (...arg: any[]) => Promise<any[]> | any[]
interface SelectionPropType extends Omit<BaseType, 'unique_key' | 'prop'>, Pick<InputType, 'suffixIcon' | 'placeholder'> {
  modelValue?: ArrayLike<string | number>;
  multiple?: boolean;
  collapseTags?: boolean;
  collapseTagsTooltip?: boolean;
  multipleLimit?: number;
  allowCreate?: boolean;
  filterable?: boolean;
  props?: Partial<{ value: string, label: string }>;
  filterMethod?: (val: string) => void;
  remoteMethod?: (val: string, loading: Ref<boolean>, fetch?: (...arg: any[]) => void) => void;
  defaultFirstOption?: boolean;
  fitInputWidth?: boolean;
  maxCollapseTags?: number;
  optionEnumFn?: EnumFnType;
}

interface SelectionEmitsType {
  (e: "update:modelValue", v: SelectionPropType['modelValue']): void
}

export type { SelectionPropType, SelectionEmitsType };