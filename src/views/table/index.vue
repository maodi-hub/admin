<template>
  <MTablePage
    row-key="asdasd0"
    :request-fn="requestFn"
    :columns="columns"
    :after-response="afterResponse"
    :form-items="form_items"
    is-deep-reactive
  >
  </MTablePage>
</template>

<script setup lang="tsx">
import { MTablePage } from "@/components/m_table_page";

import type { MFormItemPropType } from "@/components/global/m_form";
import type { MTableColumnPropType } from "@/components/global/m_table";

const initParam = { a: "sd", c: "Asd" };

const form_items: MFormItemPropType[] = [
  {
    uniqueKey: "a",
    label: "asasf",
    prop: "d",
    tips: () => <>asdasdasdasdasdasd</>,
    defaultValue: "test",
  },
];

const types = ["index", "selection", "radio", "sort", "expand", "tag"] as const;

const columns: MTableColumnPropType[] = [
  {
    label: "test asd 1",
    uniqueKey: "test asd11",
    _children: new Array(10).fill(0).map((val, idx) => ({
      label: !idx || idx == 2 ? undefined : "test 11235666 " + idx,
      uniqueKey: "asd" + idx,
      prop: "asdasd" + idx,
      type: types[idx],
      enumOptionFn() {
        return [
          { label: "test", value: "5 " + idx, type: "success" },
          { label: "test2", value: "", type: "danger" },
        ];
      },
    })),
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
