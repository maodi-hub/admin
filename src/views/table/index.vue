<template>
  <div class="table full-page">
    <MTable :columns="columns" :form_config="form_config" :table_config="table_config" table_height="100%">
    </MTable>
  </div>
</template>

<script setup lang="tsx">
import type { FormConfigPropType } from "@/components/global/m_form";
import type { TableColumnType, TableType } from "@/components/global/m_table";

import { onMounted, onActivated, h, reactive } from "vue";
import { useRoute } from "vue-router";

defineOptions({
  name: "stable",
});

const $route = useRoute();

const form_config = reactive<FormConfigPropType>({
  base_config: { inline: true },
  params: {
    a: "asd",
    b: 'asdasd',
    c: ""
  },
  formItems: [
    {
      type: 'text',
      el_type: "input",
      prop: "a",
      label: "asdasd",
      placeholder: "ahdhasdh",
    },
    {
      type: "selection",
      el_type: "select",
      prop: "c",
      placeholder: "请选择",
      label: "下拉选框",
    }
  ]
})

const table_config: TableType = {
  handleLoadData: async () => ({
    code: 0,
    data,
  }),
};

const columns: TableColumnType<{ 1: string; 2: string; 3: string }>[] = [
  {
    label: "asdasd1",
    prop: "1",
    render_header(data) {
      return h("div", "asd" + data.column.label);
    },
    render_cell({ row }) {
      return h("div", row[1] + "123");
    },
  },
  {
    label: "asdasd10",
    prop: "2",
  },
  {
    label: "asdasd3",
    prop: "3",
  },
  {
    label: "asdasd4",
  },
  {
    label: "asdasd5",
  },
  {
    label: "asdasd6",
  },
];

const data = [
  {
    1: "gdgf12423",
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
