<template>
  <div class="m-table" :class="{ unset_height }">
    <div class="m-table__wrapper" :class="{ unset_height }">
      <div class="m-table__content flex fd-column gap-5" :class="{ unset_height }">
        <div class="m-table__form p-10" v-if="show_form">
          <slot name="table_form" :form_param="form_config.params">
            <MForm v-bind="form_config">
            </MForm>
          </slot>
        </div>
        <div class="m-table__main flex-1 min-h-0 min-w-0"
          :class="{ unset_height: !max_height && table_height != '100%' }">
          <ElTable v-bind="merge_table_config" :height="getHeight.height" :max-height="getHeight.maxHeight"
            :data="table_data" v-loading="loading" v-bottom-loading="table_config.onLoadMore" ref="table_ref">
            <template v-for="(col, col_index) in columns" :key="col['column-key'] || col_index">
              <TableColumn v-bind="col">
                <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                  <slot :name="slot" v-bind="scope" />
                </template>
              </TableColumn>
            </template>
          </ElTable>
        </div>
        <div class="m-table__footer" v-if="show_pagination">
          <MPaginaiton :config="pagination" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="D">
import { ElTable } from "element-plus";
import { MForm } from "../../m_form";
import MPaginaiton from "./m_pagination.vue";

import type { FormConfigPropType } from "../../m_form";
import type { TableColumnType, TableType } from "./type";

import { computed, unref } from "vue";

import { TableColumn } from "./render";

import { vLoading } from "element-plus";
import { vBottomLoading } from "./directives";

import { useForm } from "../../m_form";
import { useTable } from "./hooks/useTable";
import { useRefs } from "@/hooks/useRefs";


interface Prop {
  form_config?: FormConfigPropType;
  table_config?: TableType<D>;
  columns?: TableColumnType<D>[];
  max_height?: number | string;
  table_height?: string | number;
  show_pagination?: boolean;
  show_form?: boolean;
}

defineOptions({
  name: "MTable",
});

const $props = withDefaults(defineProps<Prop>(), {
  form_config: () => ({}),
  table_config: () => ({}),
  columns: () => [],
  show_form: true,
  show_pagination: true
});

const {
  handleFetchData,
  handleSetPagenation,
  pagination,
  table_data,
  loading,
} = useTable($props);

const { componentRefs } = useRefs<{
  table_ref: InstanceType<typeof ElTable>;
}>();

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

    .m-table__form {
      background-color: #fff;
    }
  }
}

.unset_height {
  flex: unset;
  height: unset;
}
</style>
../../m_form/src/hooks/useForm