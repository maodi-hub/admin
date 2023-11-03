import { isArray } from "lodash";
import { login } from "./../../../../api/module/auth";
import {
  MTableColumnEditPropType,
  MTableColumnPropType,
  MTablePropType,
} from "./type";

export function getCellValue(
  row: any,
  prop?: string | number,
  global_defalut?: string | number,
  cell_defalut?: string | number
) {
  const cellValue = row[prop!];
  return cellValue || (cell_defalut ?? global_defalut);
}

export async function getEnumMap(fn: MTableColumnPropType["enumOptionFn"]) {
  try {
    const list = await fn!();
    return list;
  } catch {
    return [];
  }
}

export function formatterValueWithEnum(
  row: any,
  enums: enumTagType[],
  prop?: string | number,
  global_defalut?: string | number,
  cell_defalut?: string | number
): enumTagType {
  const cellValue = row[prop!];
  if (!cellValue) {
    return {
      value: "",
      label: getCellValue(row, prop, global_defalut, cell_defalut),
      type: "info",
    };
  }

  const cur = enums.find(({ value }) => value == cellValue);

  if (!cur) {
    return {
      value: "",
      label: getCellValue(row, prop, global_defalut, cell_defalut),
      type: "info",
    };
  }

  return cur;
}

export function filterColumnType(type?: string) {
  if (!type) return;

  const columnType = ["index", "expand", "selection"];
  if (columnType.includes(type)) return type;
}

export function initColumns<CP>(
  columns: MTablePropType<any, CP, any>["columns"],
  callBack: (
    column: MTableColumnPropType<CP> | MTableColumnEditPropType<CP>
  ) => void
) {
  if (!isArray(columns)) return [];
  return columns.map((col) => {
    const column = { ...col };
    column.isShow ??= true;

    if (column._children && isArray(column._children)) {
      column._children = initColumns(column._children, callBack);
    }

    callBack && callBack(column);

    return column;
  });
}
