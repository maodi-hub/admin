<template>
  <ElTable
    ref="table_ref"
    :data="data"
    :height="height"
    :max-height="maxHeight"
    :border="border"
    :stripe="stripe"
    :row-key="rowKey"
    @selection-change="addSelectionData"
    class="flex-1 min-w-0 min-h-0"
  >
    <!-- 默认插槽 -->
    <slot />
    <template v-for="column in columns" :key="column.uniqueKey">
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

<script setup lang="ts" generic="CP extends Record<string, any>">
import { ElTable, ElEmpty } from "element-plus";
import MTableColumn from "./table_column.vue";

import type { TableInstance } from "element-plus";
import type { MTableEmitsType, MTablePropType } from "./type";

import { provide, ref, onMounted, unref, watch } from "vue";
import Sortable from "sortablejs";

import { useTableSelection, useTableRadio } from "./hooks";

import { getEnumMap } from "./utils";

import {
  DEFAULT_VALUE_KEY,
  ROW_KEY,
  RADIO_KEY,
  ENUM_MAP_KEY,
  DEFAULT_ROW_KEY,
} from "./constant";

defineOptions({
  name: "MTable",
});

const $props = withDefaults(defineProps<MTablePropType<CP>>(), {
  border: true,
  stripe: true,
  immediate: true,
  isDeepReactive: true,
  defaultValue: "--",
  rowKey: DEFAULT_ROW_KEY,
  data: () => [],
  columns: () => [],
});
const $emit = defineEmits<MTableEmitsType<CP>>();

const { radio_id, getRadioData } = useTableRadio<CP>({
  dataKey: $props.rowKey,
});

watch(
  () => unref(radio_id),
  (n, o) => {
    $emit("radioChange", getRadioData(n, $props.data), getRadioData(o, $props.data));
  }
);

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
      const [removedItem] = $props.data.splice(oldIndex!, 1);
      $props.data.splice(newIndex!, 0, removedItem);
      // emit("dargSort", { newIndex, oldIndex });
    },
  });
};

const enumMap = ref<Map<string, enumTagType[]>>(new Map());
watch(
  () => $props.columns,
  (columns) => {
    getEnumMap(columns, async ({ enumOptionFn, uniqueKey }) => {
      enumMap.value.set(uniqueKey, []);
      try {
        const enumOpt = await enumOptionFn();
        enumMap.value.set(uniqueKey, enumOpt);
      } catch {}
    });
  },
  {
    immediate: true,
  }
);

provide(DEFAULT_VALUE_KEY, $props.defaultValue);
provide(ROW_KEY, $props.rowKey);
provide(RADIO_KEY, radio_id);
provide(ENUM_MAP_KEY, enumMap);

onMounted(dragSort);

defineExpose({
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
  :deep(.el-table__cell) {
    &.el-table-column--selection {
      .cell {
        justify-content: center;
      }
    }
  }
}
</style>
