import { ElTableColumn } from "element-plus";

import type {
  TableColumnType,
  HeaderRenderScopeType,
  RenderScopeType,
  TableType,
} from "./type";

import { useSlots } from "vue";

export function MTableColumn(props: {
  column: TableColumnType;
  base_config?: TableType;
}) {
  const $slots = useSlots();
  const { column, base_config } = props;
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
          // 存在自定义渲染
          if (render_cell) return render_cell(scope);
          // 处理多级表头
          if ($slots.default) return $slots.default(scope);
          // 列属性插槽
          if ($slots[`${prop!}_column`])
            return $slots[`${prop!}_column`]!(scope);

          // 处理数据并格式化
          const cellValue = formatter
            ? formatter(row, scope.column, row[prop!], scope.$index)
            : row[prop!];
          // 无数据，输出默认值
          if (!cellValue && cellValue !== 0) {
            return getDefaultValue(column, base_config);
          }

          return cellValue;
        },
        header: (scope: HeaderRenderScopeType<any>) => {
          const { render_header, prop } = column;
          if (render_header) return render_header(scope);
          if ($slots[`${prop!}_header`])
            return $slots[`${prop!}_header`]!(scope);
          return column.label;
        },
      }}
    </ElTableColumn>
  );
}

function getDefaultValue(column: TableColumnType, base_config?: TableType) {
  const column_default = column.defaultValue;
  const base_default = base_config?.defaultValue;
  return column_default ?? base_default;
}
