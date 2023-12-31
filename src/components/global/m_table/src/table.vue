<template>
  <ElTable
    ref="tableInstance"
    :data="data"
    :height="height"
    :max-height="maxHeight"
    :border="border"
    :stripe="stripe"
    :row-key="rowKey"
    @selection-change="$emit('selectionChange', $event)"
    class="flex-1 min-w-0 min-h-0"
  >
    <!-- 默认插槽 -->
    <slot />
    <template v-for="column in columns" :key="column.uniqueKey">
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
</template>

<script setup lang="ts" generic="CP extends Record<string, any>">
import { ElTable, ElEmpty } from "element-plus";
import MTableColumn from "./table_column.vue";

import type { OptionProps } from "@/shared/type/common";
import type { TableInstance } from "element-plus";
import type { MTableEmitsType, MTablePropType } from "./type";

import { provide, ref, onMounted, unref, watch } from "vue";
import Sortable from "sortablejs";

import { useTableRadio } from "./hooks";

import { getEnumMap } from "./utils";

import {
  DEFAULT_VALUE_KEY,
  ROW_KEY,
  RADIO_KEY,
  ENUM_MAP_KEY,
  DEFAULT_ROW_KEY,
} from "./constant";
import { isArray } from "lodash";

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

const { radio_id, getRadioData, setRadio } = useTableRadio<CP>({
  dataKey: $props.rowKey,
});

watch(
  () => unref(radio_id),
  (n, o) => {
    $emit(
      "radioChange",
      getRadioData(n, $props.data),
      getRadioData(o, $props.data)
    );
  }
);

const tableInstance = ref<TableInstance>();
// 拖拽排序
const dragSort = () => {
  const tbody = unref(tableInstance)!.$el.querySelector(
    ".el-table__body-wrapper tbody"
  ) as HTMLElement;
  Sortable.create(tbody, {
    handle: ".dragable-sort",
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      console.log(newIndex, oldIndex);
      const [removedItem] = $props.data.splice(oldIndex!, 1);
      console.log($props.data);
      $props.data.splice(newIndex!, 0, removedItem);
      // emit("dargSort", { newIndex, oldIndex });
    },
  });
};

const enumMap = ref<Map<string, OptionProps[]>>(new Map());
watch(
  () => $props.columns,
  (columns) => {
    getEnumMap(columns, async ({ enumOption, uniqueKey }) => {
      enumMap.value.set(uniqueKey, []);

      if (isArray(enumOption)) {
        enumMap.value.set(uniqueKey, enumOption);
        return;
      }

      try {
        const enumOpt = await enumOption();
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
  radio_id,
  setRadio,
  getRadioData,
  tableInstance,
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
  :deep(.el-table__body) {
    .el-table__cell {
      &.el-table-column--selection {
        .cell {
          justify-content: center;
        }
      }
      .el-form-item {
        margin: 0;
        .el-form-item__label {
          display: none;
        }
      }
    }
  }
}
</style>
