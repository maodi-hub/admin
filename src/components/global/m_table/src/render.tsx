import { ElTableColumn } from "element-plus";

import type {
  TableColumnType,
  HeaderRenderScopeType,
  RenderScopeType,
  TableType,
  TagType
} from "./type";

import { useSlots, shallowRef, unref } from "vue";

export function MTableColumn(props: {
  column: TableColumnType;
  base_config?: TableType;
}) {
  const $slots = useSlots();
  const { column, base_config } = props;
  const tags_enum = shallowRef<TagType[]>([]);
  if (column.renderType == 'tag') {
    console.log('exit');
    getTagEnum(column.optionEnumFn).then((res) => tags_enum.value = res);
  }
  return (
    <ElTableColumn
      {...column}
      align={column.align ?? "center"}
      showOverflowTooltip={
        column.showOverflowTooltip ?? column.uniqueKey !== "operation"
      }
    >
      {{
        default: (scope: RenderScopeType<any>) => {
          const { render_cell, prop, uniqueKey, formatter, _children } = column;
          const row = scope.row || {};

          // 多级表头
          if (_children && _children.length) return _children.map((item) => <MTableColumn column={item} base_config={base_config}/>)
          // 存在自定义渲染
          if (render_cell) return render_cell(scope);

          if (column.renderType && column.renderType == 'tag') {
            const tag = unref(tags_enum).find(({ value }) => value == row[prop!]) || { value: "0", label: row[prop!], type: "info" }
            return <el-tag type={tag.type}>{ tag.label }</el-tag>
          }

          // 列属性插槽
          if ($slots[`${uniqueKey!}_column`])
            return $slots[`${uniqueKey!}_column`]!(scope);

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

function getDefaultValue(column: TableColumnType, base_config?: TableType) {
  const column_default = column.defaultValue;
  const base_default = base_config?.defaultValue;
  return column_default ?? base_default;
}

async function getTagEnum(cb?: TableColumnType['optionEnumFn']) {
  if (!cb) return []
  return cb()
}
