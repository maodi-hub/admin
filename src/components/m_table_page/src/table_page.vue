<template>
  <div class="table-page">
    <MTable
      :row-key="rowKey"
      :border="border"
      :stripe="stripe"
      :height="height"
      :max-height="maxHeight"
      :default-value="defaultValue"
      :columns="table_columns"
      :data="table_data"
      @radio-change="onRadioChange"
      v-bind="$attrs"
      v-loading="loading"
    >
      <template v-for="slot in Object.keys($slots)" #[slot]="scope" :key="slot">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
    </MTable>
    <MPagination
      v-bind="pagination"
      @current-change="onCurrentChange"
      @size-change="onSizeChange"
    />
  </div>
</template>

<script setup lang="ts" generic="P, CP extends Record<string, any>, BR">
import { vLoading } from "element-plus";

import type { MTablePagePropType, MTablePageEmitsType } from "./type";
import type { MTableColumnType } from "@/components/global/m_table";

import { pick } from "lodash";

import { useTableLayout } from "@/components/global/m_table";
import { usePagination } from "@/components/global/m_pagination";
import { useInitData } from "./hooks";

defineOptions({
  name: "MTablePage",
});

const $props = withDefaults(defineProps<MTablePagePropType<P, CP, BR>>(), {
  border: true,
  stripe: true,
  immediate: true,
  isDeepReactive: true,
  defaultValue: "--",
  rowKey: "id",
  columns: () => [] as MTableColumnType<CP>[],
});

const $emit = defineEmits<MTablePageEmitsType<CP>>();

const {
  pagination,
  handleResetPagination,
  handleSetPagenation,
  onCurrentChange,
  onSizeChange,
} = usePagination({
  onCurrentChangeAfter() {
    handleDebounceData;
  },
  onSizeChangeAfter() {
    handleDebounceData;
  },
});

const requestOptions = pick(
  $props,
  "afterResponse",
  "beforeRequest",
  "requestFn",
  "immediate",
  "requestDebounce"
);

const { loading, table_data, handleGetData, handleDebounceData } = useInitData(
  requestOptions,
  $props.isDeepReactive,
  $props.searchParam,
  pagination,
  handleSetPagenation
);

const { table_columns } = useTableLayout($props.columns);

const onRadioChange = (newValue?: CP, oldValue?: CP) => {
  console.log(newValue, oldValue);
  $emit("radioChange", newValue, oldValue);
};
</script>

<style scoped></style>
