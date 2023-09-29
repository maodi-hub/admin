import mForm from "./src/m_form.vue";
import mFormItem from "./src/m_form_item.vue";

import { withInstall } from "@/utils";

export const MForm = withInstall(mForm);
export const MFormItem = withInstall(mFormItem);

export * from "./src/type";
