import type { MTableColumnType } from "../type";

import { reactive } from "vue";

import { initColumns } from "../utils";

export function useTableLayout<CP>(columns: MTableColumnType<CP>[]) {
  const table_columns = reactive<MTableColumnType<CP>[]>([]);

  const initialed_cols = initColumns<CP>(columns)

  table_columns.length = 0;
  table_columns.push(...initialed_cols);

  return {
    table_columns
  }
}