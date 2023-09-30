<template>
  <div class="table full-page">
    <MTable v-bind="form_config" :columns="columns"  :table_config="table_config" table_height="100%">
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
  form_base_config: { inline: true, labelWidth: "80px" },
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
      multiple: true,
      filterable: true,
      filterMethod: () => {}
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
      return <>"asd"{data.column.label}</> ;
    },
  },
  {
    label: "asdasd2",
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
    4: "asd62626"
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
