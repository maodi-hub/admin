import type { TableColumnType } from "@/components/global/m_table";

import { ElMapExportTable } from "table-excel";

interface ExcelColumnType {
  title: string;
  dataIndex?: string;
  children?: ExcelColumnType[];
}

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
  } catch(error) {
    console.log(error)
    return false;
  }
  return true;
}

function processTableColumn(table_column: TableColumnType[]) {
  const columns: ExcelColumnType[] = [];
  table_column.forEach((item) => {
    if (item.type && ["index", "radio", "selection"].includes(item.type)) return;
    if (item.uniqueKey === 'operation') return;
    const current: ExcelColumnType = {
      title: item.label!,
    }
    const is_children = !!(item._children && item._children.length);

    if (is_children) {
      current.children = [];
      current.children.push(...processTableColumn(item._children!));
    } else {
      current.dataIndex = item.prop
    }

    columns.push(current);
  });
  return columns;
}
