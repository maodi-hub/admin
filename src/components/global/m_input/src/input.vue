<template>
  <el-input>
    <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus";
</script>

<style scoped></style>
