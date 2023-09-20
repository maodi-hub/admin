<template>
  <div class="m-table" :class="{ unset_height }">
    <div class="m-table__wrapper" :class="{ unset_height }">
      <div class="m-table__content flex fd-column gap-5" :class="{ unset_height }">
        <div
          class="m-table__main flex-1 min-h-0 min-w-0"
          :class="{ unset_height: !max_height && table_height != '100%' }"
        >
          <ElTable
            v-bind="merge_table_config"
            :height="getHeight.height"
            :max-height="getHeight.maxHeight"
            :data="table_data"
            v-loading="loading"
            v-bottom-loading="table_config.onLoadMore"
            ref="table_ref"
          >
            <template
              v-for="(col, col_index) in columns"
              :key="col['column-key'] || col_index"
            >
              <ElTableColumn v-bind="col" :align="col?.align || 'center'">
                <template #header="scope">
                  <component :is="HeaderColumn(col, scope)"></component>
                </template>
                <template #default="scope">
                  <component :is="ColColumn(col, scope)"></component>
                </template>
              </ElTableColumn>
            </template>
          </ElTable>
        </div>
        <div class="m-table__footer">
          <MPaginaiton :config="pagination" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="D">
import { ElTable, ElTableColumn } from "element-plus";
import MPaginaiton from "./m_pagination.vue";

import { computed, unref } from "vue";

import { HeaderColumn, ColColumn } from "./render";

import { vLoading } from "element-plus";
import { vBottomLoading } from "./directives";

import { useForm } from "./hooks/useForm";
import { useTable } from "./hooks/useTable";
import { useRefs } from "@/hooks/useRefs";

import type { TableColumnType, TableType } from "./type";

interface Prop {
  table_config?: TableType<D>;
  columns?: TableColumnType<D>[];
  max_height?: number | string;
  table_height?: string | number;
}

defineOptions({
  name: "MTable",
});

const $props = withDefaults(defineProps<Prop>(), {
  table_config: () => ({}),
  columns: () => [],
});

const { form } = useForm<"table">($props.columns);
const {
  handleFetchData,
  handleSetPagenation,
  pagination,
  table_data,
  loading,
} = useTable($props);

const { componentRefs } = useRefs<{ table_ref: InstanceType<typeof ElTable> }>();

const DEFAULT_TABLE_CONFIG = {
  border: true,
  stripe: true,
  headerCellStyle: { backgroundColor: "#F2F3F5" },
};
const merge_table_config = computed(() => {
  const { table_config } = $props;
  return Object.assign({}, DEFAULT_TABLE_CONFIG, table_config);
});

const unset_height = computed(() => {
  const { max_height, table_height } = $props;

  return !!max_height || !!(table_height !== "100%");
});

const getHeight = computed(() => {
  const { max_height, table_height } = $props;
  return {
    height: max_height ? undefined : table_height || "unset",
    maxHeight: max_height || "unset",
  };
});

const getTableRef = () => unref(componentRefs)("table_ref");

defineExpose({
  handleFetchData,
  handleSetPagenation,
  getTableRef,
});
</script>

<style scoped lang="less">
.m-table {
  height: 100%;
  &__wrapper {
    height: 100%;
  }
  &__content {
    height: 100%;
  }
}

.unset_height {
  flex: unset;
  height: unset;
}
</style>
./hooks/hooks
