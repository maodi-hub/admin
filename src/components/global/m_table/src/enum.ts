import type { InjectionKey, Ref } from "vue";

export const DEFAULT_VALUE_KEY: InjectionKey<string | number> = Symbol("global_default_value");

export const ENUM_MAP_KEY:InjectionKey<Ref<Map<string | number, enumTagType[]>>> = Symbol("enum_map_key");

export const CLOUMN_SUFFIX = "_column";

export const HEADER_SUFFIX = "_header";