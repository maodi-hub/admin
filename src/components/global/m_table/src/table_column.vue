<template>
  <TableCell v-bind="$props" />
</template>

<script setup lang="tsx">
import { ElTableColumn, ElTag } from "element-plus";

import type { HeaderRenderScope, MTableColumnPropType, RenderScope } from "./type";

import { inject, useSlots, unref } from "vue";
import { isArray, isFunction } from "lodash";

import { getSlotName } from "@/components/shared";
import { getCellValue, formatterValueWithEnum } from "./utils";

import { DEFAULT_VALUE_KEY, ENUM_MAP_KEY, CLOUMN_SUFFIX, HEADER_SUFFIX } from "./enum";

defineOptions({
  name: "MTableColumn",
});

const $props = defineProps<MTableColumnPropType>();

const $slot = useSlots();

const enumMap = inject(ENUM_MAP_KEY, void 0);
const global_default_value = inject(DEFAULT_VALUE_KEY, void 0);

const TableCell = (column: MTableColumnPropType) => {
  const {
    type,
    isShow,
    label,
    prop,
    width,
    minWidth,
    headerAlign,
    cellAlign,
    fixed,
    defaultValue,
    uniqueKey,
    showOverflowToolTip,
    _children,
    _formatter,
    _renderHeader,
    _renderCell,
  } = column;

  const enums = unref(enumMap)?.get(uniqueKey) ?? [];

  if (!isShow) return;
  return (
    <ElTableColumn
      label={label}
      prop={prop}
      width={width}
      min-width={minWidth}
      header-align={headerAlign ?? cellAlign ?? "center"}
      align={cellAlign ?? "center"}
      fixed={fixed}
      showOverflowTooltip={showOverflowToolTip ?? uniqueKey !== "operation"}
    >
      {{
        default: (scope: RenderScope<any>) => {
          if (isArray(_children) && _children.length) {
            return _children.map((item) => TableCell(item));
          }

          const { row, $index } = scope;

          if (isFunction(_renderCell)) {
            return _renderCell(row, row[prop!], $index, column);
          }

          const column_slot = $slot[getSlotName(uniqueKey, CLOUMN_SUFFIX)];
          if (column_slot) {
            return column_slot({ row, cellValue: row[prop!], column, $index });
          }

          let cellValue = getCellValue(row, prop, global_default_value, defaultValue);

          if (type && enums) {
            const enumOption = formatterValueWithEnum(
              row,
              enums,
              prop,
              global_default_value,
              defaultValue
            );

            return RenderWithEnum(type, enumOption);
          }

          if (isFunction(_formatter)) {
            cellValue = _formatter(row, cellValue, $index, column);
          }

          return cellValue;
        },
        header: (scope: HeaderRenderScope<any>) => {
          if (_renderHeader) return _renderHeader();

          const { $index } = scope;

          const column_slot = $slot[getSlotName(uniqueKey, HEADER_SUFFIX)];
          if (column_slot) {
            return column_slot({ column, $index });
          }
          return label;
        },
      }}
    </ElTableColumn>
  );
};

const RenderWithEnum = (type: string, enumOption: enumTagType) => {
  const renderFn = {
    text: (opt: enumTagType) => opt.label,
    tag: (opt: enumTagType) => <ElTag type={opt.type}>{opt.label}</ElTag>,
  }[type];

  return renderFn && renderFn(enumOption);
};
</script>

<style scoped></style>
