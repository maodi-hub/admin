import { isArray } from "lodash";

import {
  MTableColumnType,
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

export async function getEnumMap(
  columns: MTableColumnType[],
  callBack: (
    option: Pick<Required<MTableColumnType>, "enumOptionFn" | "uniqueKey">
  ) => void
) {
  columns.forEach(async ({ uniqueKey, enumOptionFn, _children }) => {
    if (isArray(_children) && _children.length)
      return getEnumMap(_children, callBack);
    if (!enumOptionFn) return;

    callBack && callBack({ enumOptionFn, uniqueKey });
  });
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

export function initColumns<CP>(columns: MTablePropType<CP>["columns"]) {
  if (!isArray(columns)) return [];
  return columns.map((col) => {
    const column = { ...col };
    column.isShow ??= true;
    column.showOverflowToolTip ??= true;
    column.showOverflowHeadToolTip ??= true;

    if (column._children && isArray(column._children)) {
      column._children = initColumns(column._children);
    }

    return column;
  });
}

export function wWhetherSetOverFlow(
  uniqueKey: string,
  type: MTableColumnType["type"]
) {
  if (type && ["sort", "selection"].includes(type)) return false;
  if (uniqueKey == "operation") return false;
  return true;
}
