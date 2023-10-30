import type { MTablePropType } from "../type";

import { reactive, watch } from "vue";


export function useTableLayout<CP>(columns: MTablePropType<any, CP, any>['columns'] = []) {
  const table_columns = reactive(columns);

  watch(
    () => columns,
    (v) => {
      const columns = v.map((col) => {
        const column = { ...col };
        column.isShow ??= true;
        return column;
      });
      table_columns.length = 0;
      table_columns.push(...columns);
    },
    {
      immediate: true,
    }
  );

  return {
    table_columns
  }
}