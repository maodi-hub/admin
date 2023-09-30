import { ElTableColumn } from "element-plus";

import type {
  TableColumnType,
  HeaderRenderScopeType,
  RenderScopeType,
  TableType,
} from "./type";

import { useSlots } from "vue";

export function TableColumn(props: {
  column: TableColumnType;
  base_config: TableType;
}) {
  const $slots = useSlots();
  const { column } = props;
  return (
    <ElTableColumn
      {...column}
      align={column.align ?? "center"}
      showOverflowTooltip={
        column.showOverflowTooltip ?? column.prop !== "operation"
      }
    >
      {{
        default: (scope: RenderScopeType<any>) => {
          const { render_cell, prop, formatter } = column;
          const row = scope.row || {};
          if (render_cell) return render_cell(scope);
          if ($slots[`${prop!}_column`])
            return $slots[`${prop!}_column`]!(scope);
          return (
            (formatter
              ? formatter(row, scope.column, row[prop!], scope.$index)
              : row[prop!]) ?? "--"
          );
        },
        header: (scope: HeaderRenderScopeType<any>) => {
          const { render_header, prop } = column;
          if (render_header) return render_header(scope);
          if ($slots[`${prop!}_header`])
            return $slots[`${prop!}_header`]!(scope);
          return column.label || "--";
        },
      }}
    </ElTableColumn>
  );
}
