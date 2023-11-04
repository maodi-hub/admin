<template>
  <ElTable
    ref="table_ref"
    :data="table_data"
    :height="height"
    :max-height="maxHeight"
    :border="border"
    :stripe="stripe"
    :row-key="rowKey"
    @selection-change="addSelectionData"
    v-bind="$attrs"
    v-loading="loading"
    class="flex-1 min-w-0 min-h-0"
  >
    <!-- 默认插槽 -->
    <slot />
    <template v-for="column in table_columns" :key="column.uniqueKey">
      <MTableColumn v-bind="column">
        <template
          v-for="slot in Object.keys($slots)"
          #[slot]="scope"
          :key="slot"
        >
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
  <MPagination
    v-bind="pagination"
    v-if="showPagination"
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
  />
</template>

<script setup lang="ts" generic="P, CP extends Record<string, any>, BR">
import { ElTable, ElEmpty, vLoading, ElTableColumn } from "element-plus";
import MTableColumn from "./table_column.vue";

import type { TableInstance } from "element-plus";
import type { MTableColumnType, MTableEmitsType, MTablePropType } from "./type";

import { provide, ref, onMounted, unref, watch } from "vue";
import { omit, pick } from "lodash";
import Sortable from "sortablejs";

import {
  useTableData,
  useTableLayout,
  useTableSelection,
  useTableRadio,
} from "./hooks";

import { DEFAULT_VALUE_KEY, ROW_KEY } from "./constant";

defineOptions({
  name: "MTable",
});

const $props = withDefaults(defineProps<MTablePropType<P, CP, BR>>(), {
  border: true,
  stripe: true,
  immediate: true,
  isDeepReactive: true,
  defaultValue: "--",
  rowKey: "id",
  columns: () => [] as MTableColumnType<CP>[],
  showPagination: true,
  showTool: true,
});
defineEmits<MTableEmitsType<CP>>();

provide(DEFAULT_VALUE_KEY, $props.defaultValue);
provide(ROW_KEY, $props.rowKey);

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
  loading,
  table_data,
  handleGetData,
  handleDebounceData,
  handleResetPagination,
  handleSetPagenation,
  pagination,
  onSizeChange,
  onCurrentChange,
} = useTableData(requestOptions, $props.isDeepReactive, $props.searchParam);

const {} = useTableRadio(table_data, { dataKey: $props.rowKey });

const {
  selected_data_list,
  selected_ids,
  clearSelectionData,
  addSelectionData,
} = useTableSelection<CP>({
  dataKey: $props.rowKey,
});

const table_ref = ref<TableInstance>();
// 拖拽排序
const dragSort = () => {
  const tbody = unref(table_ref)!.$el.querySelector(
    ".el-table__body-wrapper tbody"
  ) as HTMLElement;
  Sortable.create(tbody, {
    handle: ".dragable-sort",
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      console.log(newIndex, oldIndex);
      const [removedItem] = table_data.value.splice(oldIndex!, 1);
      table_data.value.splice(newIndex!, 0, removedItem);
      // emit("dargSort", { newIndex, oldIndex });
    },
  });
};

onMounted(dragSort);

defineExpose({
  table_data,
  table_columns,
  handleGetData,
  handleDebounceData,
  handleSetPagenation,
  handleResetPagination,
  selected_ids,
  selected_data_list,
  addSelectionData,
  clearSelectionData,
});
</script>

<style scoped lang="less">
.el-table {
  --el-table-header-bg-color: rgba(233, 236, 239, 0.409);
  :deep(.el-radio) {
    &__label {
      padding-left: 0;
    }
  }
}
</style>
