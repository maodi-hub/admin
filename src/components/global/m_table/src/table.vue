<template>
  <ElTable
    v-bind="$attrs"
    :data="table_data"
    :height="height"
    :max-height="maxHeight"
    :border="border"
    :stripe="stripe"
    :row-key="rowKey"
    class="flex-1 min-w-0 min-h-0"
  >
    <template v-for="column in table_columns" :key="column.uniqueKey">
      <MTableColumn v-bind="column">
        <template v-for="slot in Object.keys($slots)" #[slot]="scope" :key="slot">
          <slot :name="slot" v-bind="scope"></slot>
        </template>
      </MTableColumn>
    </template>
    <!-- 末尾添加行 -->
    <template #append>
      <slot name="append"></slot>
    </template>

    <!-- 空数据显示 -->
    <template #empty>
      <slot name="empty">
        <el-empty description="无数据" />
      </slot>
    </template>
  </ElTable>
</template>

<script setup lang="ts" generic="P, CP, BR">
import { ElTable, ElEmpty } from "element-plus";
import MTableColumn from "./table_column.vue";

import { provide } from "vue";

import { useTableData, useTableLayout } from "./hooks";

import { DEFAULT_VALUE_KEY } from "./enum";

import type {
  MTableColumnEditPropType,
  MTableColumnPropType,
  MTablePropType,
} from "./type";

import { omit, pick } from "lodash";

defineOptions({
  name: "MTable",
});

const $props = withDefaults(defineProps<MTablePropType<P, CP, BR>>(), {
  border: true,
  stripe: true,
  immediate: true,
  isDeepReactive: true,
  defaultValue: "--",
  columns: () => [] as (MTableColumnPropType<CP> | MTableColumnEditPropType<CP>)[],
});

provide(DEFAULT_VALUE_KEY, $props.defaultValue);

const { table_columns } = useTableLayout($props.columns);

const requestOptions = pick(
  $props,
  "afterResponse",
  "beforeRequest",
  "requestFn",
  "immediate",
  "requestDebounce"
);

const {
  table_data,
  handleGetData,
  handleResetPagination,
  handleSetPagenation,
} = useTableData(requestOptions, $props.isDeepReactive, $props.searchParam);

defineExpose({
  table_data,
  table_columns,
  handleGetData,
  handleSetPagenation,
  handleResetPagination,
});
</script>

<style scoped lang="less"></style>
