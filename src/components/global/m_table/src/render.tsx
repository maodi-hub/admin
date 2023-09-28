import { ElTableColumn } from "element-plus";

import type {
  TableColumnType,
  HeaderRenderScopeType,
  RenderScopeType,
} from "./type";

import { useSlots } from "vue";

export function TableColumn(columnType: TableColumnType) {
  const $slots = useSlots();
  return (
    <ElTableColumn
      {...columnType}
      align={columnType.align ?? "center"}
      showOverflowTooltip={
        columnType.showOverflowTooltip ?? columnType.prop !== "operation"
      }
    >
      {{
        default: (scope: RenderScopeType<any>) => {
          debugger;
          const { render_cell, prop } = columnType;
          const row = scope.row || {};
          if (render_cell) return render_cell(scope);
          if ($slots[`${prop!}_col`]) return $slots[`${prop!}_col`]!(scope);
          return row[prop!] || "--";
        },
        header: (scope: HeaderRenderScopeType<any>) => {
          const { render_header, prop } = columnType;
          if (render_header) return render_header(scope);
          if ($slots[`${prop!}_header`])
            return $slots[`${prop!}_header`]!(scope);
          return columnType.label || "--";
        },
      }}
    </ElTableColumn>
  );
}
