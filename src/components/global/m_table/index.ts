import mTable from "./src/m_table.vue";
import { MTableColumn } from "./src/render";

import { withInstall } from "@/utils";

export const MTable = withInstall(mTable);
export { MTableColumn };

export * from "./src/type";
