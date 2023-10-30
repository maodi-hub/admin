import { login } from './../../../../api/module/auth';
import { MTableColumnPropType } from "./type";

export function getCellValue(
  row: any,
  prop?: string | number,
  global_defalut?: string | number,
  cell_defalut?: string | number
) {
  const cellValue = row[prop!];
  return cellValue || (cell_defalut ?? global_defalut);
}

export function getSlotName(uniqueKey: string | number, suffix: string) {
  return uniqueKey + suffix;
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
    return  { value: "", label: getCellValue(row, prop, global_defalut, cell_defalut), type: "info" }
  }

  const cur = enums.find(({ value }) => value == cellValue);

  if (!cur) {
    return  { value: "", label: getCellValue(row, prop, global_defalut, cell_defalut), type: "info" }
  }

  return cur
}
