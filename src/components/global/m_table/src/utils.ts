import type { OptionProps } from "@/shared/type/common";
import type { MTableColumnType, MTablePropType } from "./type";

import { isArray } from "lodash";

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
    option: Pick<Required<MTableColumnType>, "enumOption" | "uniqueKey">
  ) => void
) {
  columns.forEach(async ({ uniqueKey, enumOption, _children }) => {
    if (isArray(_children) && _children.length)
      return getEnumMap(_children, callBack);
    if (!enumOption) return;

    callBack && callBack({ enumOption, uniqueKey });
  });
}

export function formatterValueWithEnum(
  row: any,
  enums: OptionProps[],
  prop?: string | number,
  global_defalut?: string | number,
  cell_defalut?: string | number
): OptionProps {
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

export function whetherSetOverFlow(
  uniqueKey: string,
  type: MTableColumnType["type"]
) {
  if (type && ["sort", "selection"].includes(type)) return false;
  if (uniqueKey == "operation") return false;
  return true;
}
