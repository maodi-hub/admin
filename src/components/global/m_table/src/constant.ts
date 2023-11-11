import type { InjectionKey, Ref } from "vue";
import type { OptionProps } from "@/components/shared/type/common";

export const DEFAULT_VALUE_KEY: InjectionKey<string | number> = Symbol(
  "global_default_value"
);

export const ENUM_MAP_KEY: InjectionKey<Ref<Map<string, OptionProps[]>>> =
  Symbol("enum_map_key");

export const RADIO_KEY: InjectionKey<Ref<any>> = Symbol("radio_key");

export const ROW_KEY: InjectionKey<string> = Symbol("row_key");

export const EDIT_CLOUMN_SUFFIX = "_edit_column";

export const CLOUMN_SUFFIX = "_column";

export const HEADER_SUFFIX = "_header";

export const EXPAND_SUFFIX = "_expand";

export const INDEX_SUFFIX = "_index";

export const DEFAULT_ROW_KEY = "id";
