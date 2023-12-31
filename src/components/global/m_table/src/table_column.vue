<template>
  <TableCell v-bind="$props" />
</template>

<script setup lang="tsx">
import { ElTableColumn, ElTag, ElRadio, ElTooltip } from "element-plus";
import { MIcon } from "@/components/global/m_icon";
import { MOverflowPrompt } from "@/components/style/overflow_prompt";
import { MFormItem } from "@/components/global/m_form";

import type { OptionProps } from "@/shared/type/common";
import type {
  HeaderRenderScope,
  MTableColumnEditPropType,
  MTableColumnType,
  RenderScope,
} from "./type";

import { inject, useSlots, unref, ref } from "vue";
import { isArray, isFunction } from "lodash";

import { getSlotName } from "@/shared";

import {
  getCellValue,
  formatterValueWithEnum,
  filterColumnType,
  whetherSetOverFlow,
} from "./utils";

import {
  EXPAND_SUFFIX,
  RADIO_KEY,
  DEFAULT_ROW_KEY,
  DEFAULT_VALUE_KEY,
  ENUM_MAP_KEY,
  EDIT_CLOUMN_SUFFIX,
  CLOUMN_SUFFIX,
  HEADER_SUFFIX,
  ROW_KEY,
  INDEX_SUFFIX,
} from "./constant";
import { MTips } from "../../m_tips";

defineOptions({
  name: "MTableColumn",
});

const $props = defineProps<MTableColumnType>();

const $slot = useSlots();

const global_default_value = inject(DEFAULT_VALUE_KEY, void 0);
const enumMap = inject(ENUM_MAP_KEY, void 0);
const row_key = inject(ROW_KEY, DEFAULT_ROW_KEY);
const radio_id = inject(RADIO_KEY, ref());

const TableCell = (column: MTableColumnType) => {
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
    showOverflowHeadToolTip,
    sortable,
    _children,
    _formatter,
    _renderHeader,
    _renderCell,
    tips,
  } = column;

  const enums = unref(enumMap)?.get(uniqueKey) ?? [];

  const column_slot = $slot[getSlotName(uniqueKey, CLOUMN_SUFFIX)];
  const header_slot = $slot[getSlotName(uniqueKey, HEADER_SUFFIX)];

  if (!isShow) return;

  return (
    <ElTableColumn
      type={filterColumnType(type)}
      label={label}
      prop={prop}
      width={
        type && ["radio", "sort"].includes(type) ? width ?? "50px" : void 0
      }
      min-width={minWidth}
      header-align={headerAlign ?? cellAlign ?? "center"}
      align={cellAlign ?? "center"}
      fixed={fixed}
      sortable={sortable}
      showOverflowTooltip={
        whetherSetOverFlow(uniqueKey, type) || showOverflowToolTip
      }
    >
      {{
        default: (scope: RenderScope<any>) => {
          if (isArray(_children) && _children.length) {
            return _children.map((item) => TableCell(item));
          }

          const { row, $index } = scope;

          if (type) {
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

          if (column_slot) {
            return column_slot({ row, cellValue: row[prop!], column, $index });
          }

          let cellValue = getCellValue(
            row,
            prop,
            global_default_value,
            defaultValue
          );

          if (isFunction(_formatter)) {
            cellValue = _formatter(row, cellValue, $index, column);
          }

          return cellValue;
        },
        header: (scope: HeaderRenderScope<any>) => {
          if (_renderHeader) return _renderHeader();

          const { $index } = scope;

          if (header_slot) {
            return header_slot({ column, $index });
          }
          return (
            <>
              {tips && <MTips tips={tips} />}
              <span>
                {type && ["index", "sort", "radio"].includes(type)
                  ? label ?? "#"
                  : label}
              </span>
            </>
          );
        },
      }}
    </ElTableColumn>
  );
};

const RenderWithType = (
  type: string,
  row: any,
  column: MTableColumnType,
  $index: number,
  enumOption: OptionProps
) => {
  const { prop, uniqueKey, _renderCell } = column;
  const renderFn = {
    edit: () => (
      <RenderEditContent
        row={row}
        column={column}
        $index={$index}
        enumOption={enumOption}
      />
    ),
    radio: () => (
      <ElRadio v-model={radio_id.value} label={row[row_key]}>
        <i></i>
      </ElRadio>
    ),
    expand: () => {
      const expand_slot = $slot[getSlotName(uniqueKey, EXPAND_SUFFIX)];
      if (isFunction(_renderCell)) {
        return _renderCell(row, row[prop!], $index, column);
      }

      return (
        <>{expand_slot ? expand_slot({ row, column, $index }) : row[prop!]}</>
      );
    },
    index: () => {
      const index_slot = $slot[getSlotName(uniqueKey, INDEX_SUFFIX)];
      if (isFunction(_renderCell)) {
        return _renderCell(row, row[prop!], $index, column);
      }
      return (
        <>{index_slot ? index_slot({ row, column, $index }) : $index + 1}</>
      );
    },
    sort: () => (
      <div class="flex jc-center ai-center" style="height: 100%">
        <MIcon name="rank" class="dragable-sort" />
      </div>
    ),
    text: (opt: OptionProps) => opt.label,
    tag: (opt: OptionProps) => <ElTag type={opt.type}>{opt.label}</ElTag>,
  }[type];

  return renderFn && renderFn(enumOption);
};

const RenderEditContent = (props: {
  row: any;
  column: MTableColumnType;
  $index: number;
  enumOption: OptionProps;
}) => {
  const { column, $index, row } = props;
  const { prop, uniqueKey, _renderCell } = column;
  const form_item = column as MTableColumnEditPropType;
  const edit_slot = $slot[getSlotName(uniqueKey, EDIT_CLOUMN_SUFFIX)];
  return (
    <MFormItem
      labelWidth="unset"
      uniqueKey={uniqueKey}
      prop={prop}
      searchParam={row}
      rules={form_item.rules}
      component={form_item.component}
    >
      {{
        default: () => {
          if (isFunction(_renderCell)) {
            return _renderCell(row, row[prop!], $index, column);
          }

          if (edit_slot) {
            return edit_slot({
              row,
              cellValue: row[prop!],
              column,
              $index,
            });
          }
        },
      }}
    </MFormItem>
  );
};
</script>

<style scoped></style>
