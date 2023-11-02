import mForm from "./src/form.vue";
import mFormItem from "./src/form_item.vue";

import { withInstall } from "@/utils";

export const MForm = withInstall(mForm);
export const MFormItem = withInstall(mFormItem);

export * from "./src/type";