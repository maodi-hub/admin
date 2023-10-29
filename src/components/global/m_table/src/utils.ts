export function getCellValue(row: any, prop?: string | number, global_defalut?: string | number, cell_defalut?: string | number) {
  const cellValue = row[prop!];
  return cellValue || (cell_defalut ?? global_defalut);
}

export function getSlotName(uniqueKey: string | number, suffix: string) {
  return uniqueKey + suffix;
}