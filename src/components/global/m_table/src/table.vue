<template>
  <ElTable
    v-bind="$attrs"
    :data="data"
    :height="height"
    :max-height="maxHeight"
    :border="border"
    :stripe="stripe"
    :row-key="rowKey"
    class="flex-1 min-w-0 min-h-0"
  >
    <template v-for="column in table_columns" :key="column.uniqueKey">
      <MTableColumn v-bind="column">
        <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="scope">
          <slot :name="slot" v-bind="scope"></slot>
        </template>
      </MTableColumn>
    </template>
  </ElTable>
</template>

<script setup lang="ts" generic="P, CP">
import { ElTable } from "element-plus";
import MTableColumn from "./table_column.vue";

import { provide, reactive, watch } from "vue";

import { DEFAULT_VALUE_KEY } from "./enum";

import type {
  MTableColumnEditPropType,
  MTableColumnPropType,
  MTablePropType,
} from "./type";

defineOptions({
  name: "MTable",
});

const $props = withDefaults(defineProps<MTablePropType<P, CP>>(), {
  border: true,
  stripe: true,
  immediate: true,
  defaultValue: "--",
  columns: () => [] as (MTableColumnPropType<CP> | MTableColumnEditPropType<CP>)[],
  data: () => [],
});

provide(DEFAULT_VALUE_KEY, $props.defaultValue);

const table_columns = reactive($props.columns);

watch(
  () => $props.columns,
  (v) => {
    const columns = v.map((column) => {
      const { isShow } = column;
      column.isShow = isShow ?? true;
      return column;
    });

    table_columns.push(...columns);
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="less"></style>
