<template>
  <div class="table-page">
    <MForm
      v-if="showForm"
      ref="form"
      :form-items="formItems"
      :init-param="form_param"
      :inline="inline"
      :label-position="labelPosition"
      :label-suffix="labelSuffix"
      :label-width="labelWidth"
      :rules="rules"
    />
    <ToolBar v-if="showTool">
      <div class="custom-button">
        <slot name="custom-button"></slot>
      </div>
      <div class="tool-button">
        <slot name="tool-button"></slot>
        <el-button circle icon="Refresh" />
        <el-button circle icon="Download" />
        <el-button circle icon="Operation" />
      </div>
    </ToolBar>
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
      @selection-change="setSelectionData"
      v-bind="$attrs"
      v-loading="loading"
    >
      <template v-for="slot in Object.keys($slots)" #[slot]="scope" :key="slot">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
    </MTable>
    <MPagination
      v-if="showPagination"
      v-bind="pagination"
      @current-change="onCurrentChange"
      @size-change="onSizeChange"
    />
  </div>
</template>

<script setup lang="ts" generic="P, CP extends Record<string, any>, BR">
import { vLoading, ElButton } from "element-plus";
import ToolBar from "./components/tool_bar/index.vue";

import type { MTablePagePropType, MTablePageEmitsType } from "./type";
import type { MFormInstance } from "@/components/global/m_form";
import type { MTableInstance } from "@/components/global/m_table";

import { computed, unref } from "vue";
import { pick } from "lodash";

import { useRefs } from "@/hooks/useRefs";
import { useForm } from "@/components/global/m_form";
import { useTableLayout, useTableSelection } from "@/components/global/m_table";
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
  rowKey: "id",
  columns: () => [],
  initParam: () => ({}),
  formItems: () => [],
  showForm: true,
  showTool: true,
  showPagination: true,
});

const $emit = defineEmits<MTablePageEmitsType<CP>>();

interface PageRefs {
  form: MFormInstance;
  table: MTableInstance;
}

// 子组件实例
const { componentRefs } = useRefs<PageRefs>();

// 查询参数配置
const { form_param } = useForm($props.initParam, $props.formItems);

// 分页配置
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
  "requestDebounce"
);

// 初始化数据
const { loading, table_data, handleGetData, handleDebounceData } = useInitData<
  P,
  CP,
  BR
>(requestOptions, $props.isDeepReactive, handleSetPagenation);

// 表格列
const { table_columns } = useTableLayout($props.columns);

// 表格数据
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

// 多选设置
const { selected_ids, selected_data_list, setSelectionData } =
  useTableSelection<CP>({
    dataKey: $props.rowKey,
  });

const onRadioChange = (newValue?: CP, oldValue?: CP) => {
  console.log(newValue, oldValue);
  $emit("radioChange", newValue, oldValue);
};

// 获取子组件实例
const getInstance = <K extends keyof PageRefs>(refs_key: K) => {
  return unref(componentRefs)(refs_key) as PageRefs[K];
};

// 初始化数据
if ($props.immediate) {
  handleGetData({
    ...form_param,
    ...pick(pagination, "currentPage", "pageSize"),
  });
}

defineExpose({
  list_data,
  table_columns,
  handleGetData,
  handleDebounceData,
  pagination,
  handleSetPagenation,
  handleResetPagination,
  getInstance,
  selected_ids,
  selected_data_list,
});
</script>

<style scoped></style>
