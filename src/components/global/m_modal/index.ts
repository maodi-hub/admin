import mDialog from "./src/dialog.vue";
import mDrawer from "./src/drawer.vue";
import mModal from "./src/modal.vue";

import { withInstall } from "@/utils";

export const MModal = withInstall(mModal);
export const MDialog = withInstall(mDialog);
export const MDrawer = withInstall(mDrawer);

export * from "./src/type";