<template>
  <ElForm
    :model="searchParam"
    :inline="inline"
    :label-width="labelWidth"
    :rules="rules"
  ></ElForm>
</template>

<script setup lang="ts">
import { ElForm } from "element-plus";

import type { MFormPropType } from "./type";

defineOptions({
  name: "MForm",
});

defineProps<MFormPropType>();
</script>

<style scoped></style>
