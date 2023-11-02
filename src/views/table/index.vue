<template>
  <div class="table-page">
    <MForm :search-param="searchParam" :form-items="form_items">
      <template #a_label> sdfdf </template>
      <template #a_content> gdfg</template>
    </MForm>
    <MTable :columns="columns" :request-fn="requestFn" :after-response="afterResponse">
    </MTable>
  </div>
</template>

<script setup lang="tsx">
import type { MFormItemPropType } from "@/components/global/m_form";
import type { MTableColumnPropType } from "@/components/global/m_table";

import { reactive } from "vue";

const searchParam = reactive({ a: "sd" });

const form_items: MFormItemPropType[] = [
  {
    uniqueKey: "a",
    label: "asasf",
    prop: "a",
    tips: () => <>asdasdasdasdasdasd</>,
  },
];

const columns: MTableColumnPropType[] = new Array(10).fill(0).map((val, idx) => ({
  label: "asd" + idx,
  uniqueKey: "asd" + idx,
  prop: "asdasd" + (idx % 2),
  type: idx % 2 ? "text" : "tag",
  enumOptionFn() {
    return [
      { label: "test", value: "asd" + idx, type: "success" },
      { label: "test2", value: "", type: "danger" },
    ];
  },
}));

const requestFn = () => {
  const data = new Array(20).fill(0).map((val, idx) => ({
    asdasd0: "asd" + idx,
    asdasd1: "",
    asdasd2: idx % 2 ? "asd" + idx : "",
  }));
  return data;
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
