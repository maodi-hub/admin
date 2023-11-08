<template>
  <div class="table-page">
    <MForm
      ref="form"
      :form-items="formItems"
      :init-param="form_param"
      :inline="inline"
      :label-position="labelPosition"
      :label-suffix="labelSuffix"
      :label-width="labelWidth"
      :rules="rules"
    />
    <MTable
      ref="table"
      :row-key="rowKey"
      :border="border"
      :stripe="stripe"
      :height="height"
      :max-height="maxHeight"
      :default-value="defaultValue"
      :columns="table_columns"
      :data="list_data"
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
import type { MFormInstance } from "@/components/global/m_form";
import type { MTableInstance } from "@/components/global/m_table";

import { computed, unref } from "vue";
import { pick } from "lodash";

import { useRefs } from "@/hooks/useRefs";
import { useForm } from "@/components/global/m_form";
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
  isDeepReactive: false,
  defaultValue: "--",
  columns: () => [],
  initParam: () => ({}),
  formItems: () => [],
});

const $emit = defineEmits<MTablePageEmitsType<CP>>();

interface PageRefs {
  form: MFormInstance;
  table: MTableInstance;
}

const { componentRefs } = useRefs<PageRefs>();

const { form_param } = useForm($props.initParam, $props.formItems);

const {
  pagination,
  handleResetPagination,
  handleSetPagenation,
  onCurrentChange,
  onSizeChange,
} = usePagination({
  onCurrentChangeAfter: () => onPagenationChange(),
  onSizeChangeAfter: () => onPagenationChange(),
});

const onPagenationChange = () => {
  if ($props.data) return;
  handleDebounceData(form_param);
};

const requestOptions = pick(
  $props,
  "afterResponse",
  "beforeRequest",
  "requestFn",
  "immediate",
  "requestDebounce"
);

const requestPaginationOption = pick(pagination, "currentPage", "pageSize");

const { loading, table_data, handleGetData, handleDebounceData } = useInitData(
  requestOptions,
  $props.isDeepReactive,
  form_param,
  requestPaginationOption,
  handleSetPagenation
);

const { table_columns } = useTableLayout($props.columns);

const list_data = computed(() => {
  const { afterResponse, data } = $props;
  const { pageSize, currentPage } = pagination;

  let list: CP[] = data ?? table_data.value;
  handleSetPagenation({ total: list.length });
  if (data) {
    list = afterResponse ? afterResponse(data, handleSetPagenation) : data;
    return list.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }
  return list;
});

const onRadioChange = (newValue?: CP, oldValue?: CP) => {
  console.log(newValue, oldValue);
  $emit("radioChange", newValue, oldValue);
};

const getInstance = <K extends keyof PageRefs>(refs_key: K) => {
  return unref(componentRefs)(refs_key) as PageRefs[K];
};

defineExpose({
  list_data,
  table_columns,
  handleGetData,
  handleDebounceData,
  pagination,
  handleSetPagenation,
  handleResetPagination,
  getInstance,
});
</script>

<style scoped></style>
