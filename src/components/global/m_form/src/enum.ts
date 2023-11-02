import { InjectionKey } from "vue";

export const PARAM_KEY:InjectionKey<Record<string, any>> = Symbol("param_key");

export const LABEL_SUFFIX = "_label";

export const CONTENT_SUFFIX = "_content";