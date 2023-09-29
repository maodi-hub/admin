import type { App } from "vue";

import * as Icons from "@element-plus/icons-vue";
import {
  ElInput,
  ElTag,
  ElDatePicker,
  ElTimePicker,
  ElButton,
  ElCheckboxGroup,
  ElCheckbox,
  ElCheckboxButton,
  ElRadioGroup,
  ElRadio,
  ElRadioButton,
  ElSelect,
  ElOption,
} from "element-plus";

const global_register = [
  ElInput,
  ElTag,
  ElDatePicker,
  ElTimePicker,
  ElButton,
  ElCheckboxGroup,
  ElCheckbox,
  ElCheckboxButton,
  ElRadioGroup,
  ElRadio,
  ElRadioButton,
  ElSelect,
  ElOption,
];

export default {
  init(app: App, ...options: any[]) {
    for (let [name, component] of Object.entries(Icons)) {
      app.component(name, component);
    }
    global_register.forEach((comp) => app.use(comp));
  },
};
