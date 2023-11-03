<template>
  <TableCell v-bind="$props" />
</template>

<script setup lang="tsx">
import { ElTableColumn, ElTag, ElRadio } from "element-plus";

import type { HeaderRenderScope, MTableColumnPropType, RenderScope } from "./type";

import { inject, useSlots, unref, ref } from "vue";
import { isArray, isFunction } from "lodash";

import { getSlotName } from "@/components/shared";
import { getCellValue, formatterValueWithEnum, filterColumnType } from "./utils";
import { EXPAND_SUFFIX, RADIO_KEY } from "./constant";

import {
  DEFAULT_VALUE_KEY,
  ENUM_MAP_KEY,
  CLOUMN_SUFFIX,
  HEADER_SUFFIX,
  ROW_KEY,
} from "./constant";

defineOptions({
  name: "MTableColumn",
});

const $props = defineProps<MTableColumnPropType>();

const $slot = useSlots();

const radio_id = inject(RADIO_KEY, ref());

const enumMap = inject(ENUM_MAP_KEY, void 0);
const global_default_value = inject(DEFAULT_VALUE_KEY, void 0);
const row_key = inject(ROW_KEY, "id");

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
    sortable,
    _children,
    _formatter,
    _renderHeader,
    _renderCell,
  } = column;

  const enums = unref(enumMap)?.get(uniqueKey);

  if (!isShow) return;

  return (
    <ElTableColumn
      type={filterColumnType(type)}
      label={label}
      prop={prop}
      width={type == "radio" ? width ?? "50px" : undefined}
      min-width={minWidth}
      header-align={headerAlign ?? cellAlign ?? "center"}
      align={cellAlign ?? "center"}
      fixed={fixed}
      sortable={sortable}
      showOverflowTooltip={showOverflowToolTip ?? uniqueKey !== "operation"}
    >
      {{
        default: (scope: RenderScope<any>) => {
          if (isArray(_children) && _children.length) {
            return _children.map((item) => TableCell(item));
          }

          const { row, $index } = scope;

          if (type && enums) {
            const enumOption = formatterValueWithEnum(
              row,
              enums,
              prop,
              global_default_value,
              defaultValue
            );

            return RenderWithType(type, row, column, $index, enumOption);
          }

          if (isFunction(_renderCell)) {
            return _renderCell(row, row[prop!], $index, column);
          }

          const column_slot = $slot[getSlotName(uniqueKey, CLOUMN_SUFFIX)];
          if (column_slot) {
            return column_slot({ row, cellValue: row[prop!], column, $index });
          }

          let cellValue = getCellValue(row, prop, global_default_value, defaultValue);

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

const RenderWithType = (
  type: string,
  row: any,
  column: MTableColumnPropType,
  $index: number,
  enumOption: enumTagType
) => {
  const { prop, uniqueKey } = column;
  const expand_slot = $slot[getSlotName(uniqueKey, EXPAND_SUFFIX)];
  const renderFn = {
    radio: () => (
      <ElRadio v-model={radio_id.value} label={row[row_key]}>
        <i></i>
      </ElRadio>
    ),
    expand: () => <>{expand_slot ? expand_slot({ row, column, $index }) : row[prop!]}</>,
    text: (opt: enumTagType) => opt.label,
    tag: (opt: enumTagType) => <ElTag type={opt.type}>{opt.label}</ElTag>,
  }[type];

  return renderFn && renderFn(enumOption);
};
</script>

<style scoped></style>
