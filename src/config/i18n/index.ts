
import { createI18n} from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 是否全局注入
  fallbackLocale: 'zh',
  locale: 'zh',
  silentTranslationWarn: true
})

export default i18n;