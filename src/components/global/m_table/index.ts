import mTable from "./src/table.vue";
import mTableColumn from "./src/table_column.vue";

import { withInstall } from "@/utils";

export const MTable = withInstall(mTable);
export const MTableColumn = withInstall(mTableColumn);

export * from "./src/type";

export * from "./src/hooks";