<template>
  <div class="table-page">
    <MForm
      :search-param="searchParam"
      :form-items="form_items"
      :label-suffix="':'"
    >
    </MForm>
    <MTable
      :columns="columns"
      :request-fn="requestFn"
      :after-response="afterResponse"
      row-key="asdasd0"
      is-deep-reactive
      @radio-change="onRadioChange"
    >
      <template #asd2_expand="scope">
        {{ scope }}
      </template>
    </MTable>
  </div>
</template>

<script setup lang="tsx">
import type { MFormItemPropType } from "@/components/global/m_form";
import type { MTableColumnPropType } from "@/components/global/m_table";

import { reactive } from "vue";

const searchParam = reactive({ a: "sd", c: "Asd" });

const form_items: MFormItemPropType[] = [
  {
    uniqueKey: "a",
    label: "asasf",
    prop: "a",
    tips: () => <>asdasdasdasdasdasd</>,
    _children: [
      {
        uniqueKey: "ab",
        label: "asasf",
        prop: "a",
        tips: () => <>test</>,
        _children: [
          {
            uniqueKey: "abc",
            label: "asasf",
            prop: "a",
            tips: () => <>test123</>,
          },
          {
            uniqueKey: "abd",
            label: "asasf",
            prop: "c",
            tips: () => <>test123</>,
          },
        ],
      },
    ],
  },
];

const types = ["index", "selection", "radio", "sort", "expand"] as const;

const columns: MTableColumnPropType[] = new Array(10)
  .fill(0)
  .map((val, idx) => ({
    label: !idx || idx == 2 ? undefined : "test 11235666 " + idx,
    uniqueKey: "asd" + idx,
    prop: "asdasd" + idx,
    type: types[idx],
    // showOverflowHeadToolTip: idx <= 4 ? false : true,
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
    asdasd3: "test" + idx,
    asdasd4: "4 " + idx,
    asdasd5: "5 " + idx,
    asdasd6: "6 " + idx,
    asdasd7: "7 " + idx,
  }));
  return data;
};

const onRadioChange = (newValue: any, oldValue: any) => {
  console.log(newValue, oldValue);
};

const afterResponse = (
  res: { asdasd0: string; asdasd1: string; asdasd2: string }[]
) => {
  return res;
};

// const data = new Array(20).fill(0).map((val, idx) => ({
//   asdasd0: idx % 2 ? "asd" + idx : "",
//   asdasd1: "",
//   asdasd2: idx % 2 ? "asd" + idx : "",
// }));
</script>

<style scoped></style>
