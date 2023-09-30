import { BaseType, InputType } from "../../m_form/src/type";

interface SelectionPropType extends BaseType, Pick<InputType, 'suffixIcon' | 'prefix' | 'placeholder'> {
  modelValue?: ArrayLike<string | number>;
  multiple?: boolean;
  valueKey?: string;
  collapseTags?: boolean;
  collapseTagsTooltip?: boolean;
  multipleLimit?: number;
  allowCreate?: boolean;
  filterable?: boolean;
  filterMethod?: (val: string) => void;
  remoteMethod?: (val: string) => void;
  defaultFirstOption?: boolean;
  fitInputWidth?: boolean;
  maxCollapseTags?: number;
  optionEnumFn?: () => Promise<any>
}

interface SelectionEmitsType {
  (e: "update:modelValue", v: SelectionPropType['modelValue']): void
}

export type { SelectionPropType, SelectionEmitsType };