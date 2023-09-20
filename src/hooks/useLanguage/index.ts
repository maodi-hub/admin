import type { UseI18nOptions } from "vue-i18n";

import { LANGUAGE_CONFIG } from "./const";

import { setI18nLocale, getI18nMessageByKey } from "@/langs";

import { useI18n } from "vue-i18n";

export function useLanguage(options?: UseI18nOptions) {
  return {
    ...useI18n(options),
    LANGUAGE_CONFIG,
    setI18nLocale,
    getI18nMessageByKey
  }
}