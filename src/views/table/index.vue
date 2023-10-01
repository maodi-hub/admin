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
      label: "asdasd",
      placeholder: "请输入",
    },
    {
      type: "selection",
      el_type: "select",
      prop: "c",
      placeholder: "请选择",
      label: "下拉选框",
      multiple: true,
      filterable: true,
      defaultValue: ["2"],
      async optionEnumFn() {
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
  rowKey: "1",
  handleLoadData: async () => ({
    code: 0,
    data,
  }),
  defaultValue: "--",
};

const columns: TableColumnType<{ 1: string; 2: string; 3: string }>[] = [
  {
    type: "selection",
  },
  {
    label: "asdasd1",
    prop: "1",
    render_header(data) {
      return <>"asd"{data.column.label}</>;
    },
  },
  {
    label: "asdasd2",
    prop: "2",
    defaultValue: "默认值",
  },
  {
    label: "asdasd3",
    prop: "3",
  },
  {
    label: "asdasd4",
    prop: "4",
  },
  {
    label: "asdasd5",
  },
];

const data = [
  {
    1: "gdgf12423",
    2: "",
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
    2: "sdfsd",
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
