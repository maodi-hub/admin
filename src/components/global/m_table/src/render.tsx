import { ElTableColumn } from "element-plus";
import EditRowInput from "./component/edit_row_input.vue";

import type {
  TableColumnType,
  HeaderRenderScopeType,
  RenderScopeType,
  TableType,
  TagType,
} from "./type";

import { useSlots, unref } from "vue";
import { omit } from "lodash";

export function MTableColumn(props: {
  column: TableColumnType;
  base_config?: TableType;
  enumMap?: Map<string, TagType[]>;
}) {
  const $slots = useSlots();
  const { column, base_config, enumMap } = props;
  const bindProp = omit(column, "formatter");
  return (
    <ElTableColumn
      {...bindProp}
      align={column.align ?? "center"}
      showOverflowTooltip={
        column.showOverflowTooltip ?? column.uniqueKey !== "operation"
      }
    >
      {{
        default: (scope: RenderScopeType<any>) => {
          const { render_cell, uniqueKey, _children } = column;
          const row = scope.row || {};

          // 多级表头
          if (_children && _children.length)
            return _children.map((item) => (
              <MTableColumn
                column={item}
                base_config={base_config}
                enumMap={enumMap}
              />
            ));
          // 存在自定义渲染
          if (render_cell) return render_cell(scope);

          const cellValue = getCellValue(
            row,
            column,
            scope.$index,
            base_config
          );

          if (column.renderType && column.renderType == "tag") {
            const tags = enumMap?.get(uniqueKey) || [];
            const tag = unref(tags).find(({ value }) => value == cellValue) || {
              value: "",
              label: cellValue,
              type: "info",
            };
            return <el-tag type={tag.type}>{tag.label || cellValue}</el-tag>;
          }

          // 列属性插槽
          if ($slots[`${uniqueKey!}_column`])
            return $slots[`${uniqueKey!}_column`]!(scope);

          return cellValue;
        },
        header: (scope: HeaderRenderScopeType<any>) => {
          const { render_header, uniqueKey } = column;
          if (render_header) return render_header(scope);
          if ($slots[`${uniqueKey!}_header`])
            return $slots[`${uniqueKey!}_header`]!(scope);
          return column.label;
        },
      }}
    </ElTableColumn>
  );
}

function getCellValue(
  row: Record<string, any>,
  column: TableColumnType,
  $index: number,
  base_config?: TableType
) {
  const { formatter, prop } = column;
  const cellValue = formatter
    ? formatter(row, column, row[prop!], $index)
    : row[prop!];

  // 无数据，输出默认值
  if (!cellValue && cellValue !== 0) {
    const column_default = column.defaultValue;
    const base_default = base_config?.defaultValue;
    return column_default ?? base_default;
  }

  return cellValue;
}
