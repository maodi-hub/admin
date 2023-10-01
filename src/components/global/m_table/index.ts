import mTable from "./src/m_table.vue";
import { MTableColumn as mTableColumn } from "./src/render";

import { withInstall } from "@/utils";

export const MTable = withInstall(mTable);
export const MTableColumn = withInstall(mTableColumn);

export * from "./src/type";

export * from "./src/hooks";
