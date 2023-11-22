<template>
  <MTablePage
    row-key="asdasd0"
    :columns="columns"
    :request-fn="requestFn"
    :after-response="afterResponse"
    :form-items="form_items"
    label-width="auto"
    is-deep-reactive
  >
    <template #asd6_edit_column> dasd </template>
    <template #custom-button>
      <ElButton type="primary">新增</ElButton>
    </template>
    <template #operation_column>
      <el-button type="primary" @click="show = true">asdd</el-button>
    </template>
  </MTablePage>
  <MModal v-model:visible="show" type="drawer" />
</template>

<script setup lang="tsx">
import { ElButton } from "element-plus";
import { MTablePage } from "@/components/m_table_page";

import type { MFormItemPropType } from "@/components/global/m_form";
import type { MTableColumnType } from "@/components/global/m_table";

import { reactive, ref } from "vue";

const show = ref(true);

const initParam = { a: "sd", c: "Asd" };

const form_items: MFormItemPropType[] = [
  {
    uniqueKey: "a",
    label: "asasf",
    prop: "d",
    tips() {
      return <>asd</>;
    },
    defaultValue: "test",
    component: {
      name: "MSelect",
      enumOption() {
        return [
          {
            label: "asdd",
            value: "asdd asd",
          },
          {
            label: "fgsdf",
            value: "agdfg",
          },
        ];
      },
    },
  },
  {
    uniqueKey: "as",
    prop: "a",
    label: "Asdasd",
    tips() {
      return <>asd</>;
    },
    component: {
      name: "MInput",
    },
  },
  {
    uniqueKey: "asd",
    prop: "dc",
    label: "dvdv",
    component: {
      name: "MInput",
    },
  },
  {
    uniqueKey: "asdad",
    prop: "dc",
    label: "dvdv",
    component: {
      name: "MCheckbox",
      enumOption: [
        {
          value: "A",
          label: "test1",
        },
        {
          value: "B",
          label: "test2",
        },
      ],
    },
  },
  {
    uniqueKey: "asdasdf",
    prop: "dcff",
    label: "dvdv",
    component: {
      name: "MRadio",
      enumOption: [
        {
          value: "A",
          label: "test1",
        },
        {
          value: "B",
          label: "test2",
        },
      ],
    },
  },
];

const types = ["index", "selection", "radio", "sort", "expand", "tag"] as const;

const columns: MTableColumnType[] = [
  {
    label: "test asd 1",
    uniqueKey: "test asd11",
    _children: new Array(10).fill(0).map((val, idx) => ({
      label: !idx || idx == 2 ? void 0 : "test 11235666 " + idx,
      uniqueKey: "asd" + idx,
      prop: "asdasd" + idx,
      type: types[idx],
      enumOption: [
        { label: "test", value: "5 " + idx, type: "success" },
        { label: "test2", value: "", type: "danger" },
      ],
    })),
  },
  {
    label: "操作",
    uniqueKey: "operation",
  },
];

const requestFn = () => {
  const data = new Array(10).fill(0).map((val, idx) => ({
    asdasd0: "asd" + idx,
    asdasd1: "",
    asdasd2: idx % 2 ? "asd" + idx : "",
    asdasd3: "test" + idx,
    asdasd4: "4 " + idx,
    asdasd5: "5 " + idx,
    asdasd6: "6 " + idx,
    asdasd7: "7 " + idx,
  }));
  return data;
};

const data = reactive(
  new Array(80).fill(0).map((val, idx) => ({
    asdasd0: "asd" + idx,
    asdasd1: "",
    asdasd2: idx % 2 ? "asd" + idx : "",
    asdasd3: "test" + idx,
    asdasd4: "4 " + idx,
    asdasd5: "5 " + idx,
    asdasd6: "6 " + idx,
    asdasd7: "7 " + idx,
  }))
);

const onRadioChange = (newValue: any, oldValue: any) => {
  console.log(newValue, oldValue);
};

const afterResponse = (res: { asdasd0: string; asdasd1: string; asdasd2: string }[]) => {
  return res;
};

// const data = new Array(20).fill(0).map((val, idx) => ({
//   asdasd0: idx % 2 ? "asd" + idx : "",
//   asdasd1: "",
//   asdasd2: idx % 2 ? "asd" + idx : "",
// }));
</script>

<style scoped></style>
