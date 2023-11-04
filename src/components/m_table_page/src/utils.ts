import { isArray } from "lodash";

import type {
  MTableColumnEditPropType,
  MTableColumnPropType,
  MTablePropType,
} from "@/components/global/m_table";

export function initColumns<CP>(
  columns: MTablePropType<any, CP>["columns"],
  callBack: (
    column: MTableColumnPropType<CP> | MTableColumnEditPropType<CP>
  ) => void
) {
  if (!isArray(columns)) return [];
  return columns.map((col) => {
    const column = { ...col };
    column.isShow ??= true;
    column.showOverflowHeadToolTip ??= true;

    if (column._children && isArray(column._children)) {
      column._children = initColumns(column._children, callBack);
    }

    callBack && callBack(column);

    return column;
  });
}