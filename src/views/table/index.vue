<template>
  <div class="table-page">
    <MTable :columns="columns" :data="data"> </MTable>
  </div>
</template>

<script setup lang="ts">
import type {
  MTableColumnEditPropType,
  MTableColumnPropType,
} from "@/components/global/m_table";

const columns: (MTableColumnPropType | MTableColumnEditPropType)[] = new Array(10)
  .fill(0)
  .map((val, idx) => ({
    label: "asd" + idx,
    uniqueKey: "asd" + idx,
    prop: "asdasd" + (idx % 2),
    rule: [{ required: true }],
  }));

const data = new Array(20).fill(0).map((val, idx) => ({
  asdasd0: idx % 2 ? "asd" + idx : "",
  asdasd1: "",
  asdasd2: idx % 2 ? "asd" + idx : "",
}));
</script>

<style scoped></style>
