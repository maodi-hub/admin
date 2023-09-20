import i18n from "@/config/i18n";
import type { I18n } from "vue-i18n";
import type { MessageType } from "./interface";

function getLangs() {
  const langs = import.meta.glob("./modules/*.json", { eager: true }) as MetaGlobTypeWithDefault<Record<string, unknown>>;
  const messages: MessageType = {};
  for (let [u, de] of Object.entries(langs)) {
    const key = u.slice(10, -5);
    messages[key] = de.default;
  }
  return messages;
}

async function initLanguage(
  i18n: I18n<{}, {}, {}, string, false>,
  messages: MessageType
) {
  for (let [key, value] of Object.entries(messages)) {
    i18n.global.setLocaleMessage(key, value);
  }
}

function setI18nLocale(key: string, message?: Record<string, unknown>) {
  i18n.global.locale.value = key;

  if (!message) return;
  if (i18n.global.availableLocales.includes(key)) {
    i18n.global.mergeLocaleMessage(key, message);
    return
  }
  i18n.global.setLocaleMessage(key, message)

}

function getI18nMessageByKey(key: string | number) {
  return i18n.global.t(key);
}

initLanguage(i18n, getLangs());

export {
  setI18nLocale,
  getI18nMessageByKey
}
