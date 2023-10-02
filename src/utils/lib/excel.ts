import type { TableColumnType } from "@/components/global/m_table";

import { ElMapExportTable } from "table-excel";

export async function handleExport(
  table_column: TableColumnType[],
  data: Record<string, any>[],
  title: string
) {
  try {
    const column = processTableColumn(table_column);
    const instance = new ElMapExportTable({
      column,
      data,
    });
    instance.download(title);
  } catch {
    return false;
  }
  return true
}

function processTableColumn(table_column: TableColumnType[]) {
  return table_column
    .filter(({ label, prop }) => prop != "operation" && label && prop)
    .map(({ label, prop }) => ({
      title: label,
      dataIndex: prop,
    }));
}
