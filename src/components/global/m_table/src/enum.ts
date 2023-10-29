import type { InjectionKey } from "vue";

export const DEFAULT_VALUE_KEY: InjectionKey<string | number> = Symbol("global_default_value");

export const CLOUMN_SUFFIX = "_column";

export const HEADER_SUFFIX = "_header";