<template>
  <div class="table full-page">
    <MTable
      ref="table"
      v-bind="form_config"
      :columns="columns"
      :table_config="table_config"
      table_height="100%"
    >
      <template #e_column="{ row, $index }">
        <EditRowInput v-model="row.d" v-model:editing="editingRows[$index]" />
      </template>
      <template #f_column="{ row, $index }">
        <EditRowInput v-model="row.f" v-model:editing="editingRows[$index]" />
      </template>
      <template #operation_column="{ row, $index }">
        <el-button
          type="primary"
          @click="setRowsState($index, true)"
          v-show="!getRowState($index)"
          >编辑</el-button
        >
        <el-button
          type="primary"
          @click="setRowsState($index, true)"
          v-show="getRowState($index)"
          >保存</el-button
        >
        <el-button plain @click="setRowsState($index, false)">取消</el-button>
      </template>
    </MTable>
  </div>
</template>

<script setup lang="tsx">
import { MTable, useRowEditing } from "@/components/global/m_table";
import EditRowInput from "@/components/global/m_table/src/component/edit_row_input.vue";

import type { FormConfigPropType } from "@/components/global/m_form";
import type { TableColumnType, TableType } from "@/components/global/m_table";

import { onMounted, onActivated, reactive } from "vue";
import { useRoute } from "vue-router";

defineOptions({
  name: "stable",
});

const $route = useRoute();
const { editingRows, getRowState, setRowsState, clearRowsState } = useRowEditing();

const form_config = reactive<FormConfigPropType>({
  params: {
    a: "",
    c: "",
  },
  formItems: [
    {
      type: "text",
      el_type: "input",
      prop: "a",
      unique_key: "a",
      label: "asdasd",
      placeholder: "请输入",
    },
    {
      type: "selection",
      el_type: "select",
      prop: "c",
      unique_key: "c",
      placeholder: "请选择",
      label: "下拉选框",
      multiple: true,
      filterable: true,
      defaultValue: ["2"],
      optionEnumFn() {
        return [
          { value: "1", label: "asdads" },
          { value: "2", label: "你好m" },
          { value: "3", label: "你好masda" },
          { value: "4", label: "你好mdasdas" },
        ];
      },
    },
  ],
});

const table_config: TableType<{ 1: string; 2: string; 3: string }[]> = {
  isDeepReactive: true,
  handleLoadData: () => {
    clearRowsState();
    return data;
  },
  defaultValue: "--",
  rowKey: "1",
};

const columns: TableColumnType<{ 1: string; 2: string; 3: string }>[] = [
  { type: "selection", uniqueKey: "selection" },
  {
    label: "asdasd1",
    uniqueKey: "a",
    prop: "a",
  },
  {
    label: "asdasd2",
    prop: "b",
    defaultValue: "默认值",
    renderType: "tag",
    uniqueKey: "g",
    optionEnumFn() {
      return [
        {
          value: "0",
          label: "禁用",
          type: "danger",
        },
        {
          value: "1",
          label: "启用",
          type: "success",
        },
      ];
    },
  },
  {
    label: "asdasd3",
    prop: "c",
    uniqueKey: "d",
    renderType: "tag",
    width: 300,
    optionEnumFn() {
      return [
        {
          value: "ass",
          label: "你好",
          type: "danger",
        },
        {
          value: "ss",
          label: "我不好",
          type: "success",
        },
      ];
    },
  },
  {
    label: "asdasd4",
    prop: "d",
    uniqueKey: "e",
    width: "300",
  },
  {
    label: "asdasd5",
    prop: "f",
    uniqueKey: "f",
  },
  {
    uniqueKey: "operation",
    width: 300,
    render_header(data) {
      return <el-button>保存全部</el-button>;
    },
  },
];

const data = [
  {
    a: "gdgf12423",
    b: "1",
    c: "ass",
    d: "asd62626",
  },
  {
    a: "sdfsdf",
    b: "0",
    c: "ss",
  },
  {
    a: "sdfsdf",
    b: 0,
    c: "ass",
  },
  {
    a: "sdfsdf",
    b: "1",
    c: "ass",
    d: "123dfsdf",
  },
  {
    a: "sdfsdf",
    b: "sdfsd",
    c: "ass",
    d: 0,
  },
  {
    a: "sdfsdf",
    b: "sdfsd",
    c: "ass",
    d: "616516",
  },
  {
    a: "sdfsdf",
    b: "sdfsd",
    c: "ass",
    d: "616516",
  },
  {
    a: "sdfsdf",
    b: "sdfsd",
    c: "ass",
    d: "616516",
  },
  {
    a: "sdfsdf",
    b: "sdfsd",
    c: "ass",
    d: "616516",
  },
  {
    a: "sdfsdf",
    b: "sdfsd",
    c: "ass",
    d: "616516",
  },
  {
    a: "sdfsdf",
    b: "sdfsd",
    c: "ass",
    d: "616516",
  },
  {
    a: "sdfsdf",
    b: "sdfsd",
    c: "ass",
    d: "616516",
  },
  {
    a: "sdfsdf",
    b: "sdfsd",
    c: "ass",
    d: "616516",
  },
];

onMounted(() => {
  console.log($route.path + " 挂载");
});

onActivated(() => {
  console.log($route.path + " 激活");
});
</script>

<style scoped></style>
