import type { MTableColumnType } from "../type";

import { reactive, ref, provide } from "vue";

import { ENUM_MAP_KEY } from "../enum";
import { getEnumMap, initColumns } from "../utils";

export function useTableLayout<CP>(columns: MTableColumnType<CP>[]) {
  const table_columns = reactive<MTableColumnType<CP>[]>([]);
  const enumMap = ref<Map<string | number, enumTagType[]>>(new Map());
  provide(ENUM_MAP_KEY, enumMap);

  const initialed_cols = initColumns<CP>(columns, (column) => {
    if (column.enumOptionFn) {
      enumMap.value.set(column.uniqueKey, []);
      getEnumMap(column.enumOptionFn).then((res) => {
        enumMap.value.set(column.uniqueKey, res);
      })
    }
  })

  table_columns.length = 0;
  table_columns.push(...initialed_cols);

  return {
    table_columns
  }
}