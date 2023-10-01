import { Ref } from "vue";
import { BaseType, InputType } from "../../m_form/src/type";

type EnumFnType = (...arg: any[]) => Promise<any[]>
interface SelectionPropType extends BaseType, Pick<InputType, 'suffixIcon' | 'prefix' | 'placeholder'> {
  modelValue?: ArrayLike<string | number>;
  multiple?: boolean;
  valueKey?: string;
  collapseTags?: boolean;
  collapseTagsTooltip?: boolean;
  multipleLimit?: number;
  allowCreate?: boolean;
  filterable?: boolean;
  props?: Partial<{ value: string, label: string }>;
  filterMethod?: (val: string) => void;
  remoteMethod?: (val: string, loading: Ref<boolean>, fetch?: EnumFnType) => void;
  defaultFirstOption?: boolean;
  fitInputWidth?: boolean;
  maxCollapseTags?: number;
  optionEnumFn?: EnumFnType
}

interface SelectionEmitsType {
  (e: "update:modelValue", v: SelectionPropType['modelValue']): void
}

export type { SelectionPropType, SelectionEmitsType };