import type { MTablePropType } from "../type";

import { reactive, ref, watch, provide } from "vue";

import { ENUM_MAP_KEY } from "../enum";
import { getEnumMap } from "../utils";


export function useTableLayout<CP>(columns: MTablePropType<any, CP, any>['columns'] = []) {
  const table_columns = reactive(columns);
  const enumMap = ref<Map<string | number, enumTagType[]>>(new Map());
  provide(ENUM_MAP_KEY, enumMap);

  watch(
    () => columns,
    (v) => {
      const columns = v.map((col) => {
        const column = { ...col };
        column.isShow ??= true;

        if (column.enumOptionFn) {
          enumMap.value.set(column.uniqueKey, []);
          getEnumMap(column.enumOptionFn).then((res) => {
            enumMap.value.set(column.uniqueKey, res);
          })
        }

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