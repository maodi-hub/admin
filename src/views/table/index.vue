<template>
  <div class="table full-page">
    <MTable
      ref="table"
      v-bind="form_config"
      :columns="columns"
      :table_config="table_config"
      table_height="100%"
    >
    </MTable>
  </div>
</template>

<script setup lang="tsx">
import { MTable } from "@/components/global/m_table";

import type { FormConfigPropType } from "@/components/global/m_form";
import type { TableColumnType, TableType } from "@/components/global/m_table";

import { onMounted, onActivated, reactive } from "vue";
import { useRoute } from "vue-router";

defineOptions({
  name: "stable",
});

const $route = useRoute();

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

const table_config: TableType = {
  handleLoadData: () => data,
  defaultValue: "--",
  rowKey: "1",
};

const columns: TableColumnType<{ 1: string; 2: string; 3: string }>[] = [
  {
    label: "asdasd1",
    uniqueKey: "a",
    prop: "1",
  },
  {
    label: "asdasd2",
    prop: "2",
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
    prop: "3",
    uniqueKey: "d",
    renderType: "tag",
    optionEnumFn() {
      return [
        {
          value: "ass",
          label: "禁用",
          type: "danger",
        },
        {
          value: "ss",
          label: "启用",
          type: "success",
        },
      ];
    },
  },
  {
    label: "asdasd4",
    prop: "4",
    uniqueKey: "e",
  },
  {
    label: "asdasd5",
    uniqueKey: "f",
  },
];

const data = [
  {
    1: "gdgf12423",
    2: "1",
    3: "ass",
    4: "asd62626",
  },
  {
    1: "sdfsdf",
    2: "0",
    3: "ss",
  },
  {
    1: "sdfsdf",
    2: 0,
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "1",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
    4: 0,
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
  },
  {
    1: "sdfsdf",
    2: "sdfsd",
    3: "ass",
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
