<template>
  <div class="dialog">
    <ElButton @click="handleOpenDialog">dialog1</ElButton>
    <ElButton @click="handleOpenDrawer">drawer1</ElButton>
    <m-dialog ref="dialog1Ref" title="12312323" dialog_is_center>
      asdadsdgd
      <template #footer> asdasdrhrth </template>
    </m-dialog>
    <MDrawer ref="drawer1Ref" title="12312323">
      asdadsdgd
      <template #footer> asdasdrhrth </template>
    </MDrawer>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { MDialog } from "@/components/global/m_dialog";
import { MDrawer } from "@/components/global/m_drawer";

import type { ComponentCollection } from "./type";

import { unref } from "vue";

import { useRefs } from "@/hooks/useRefs";

const { componentRefs } = useRefs<ComponentCollection>();

const handleOpenDialog = () => {
  const a = unref(componentRefs)("dialog1Ref")?.handleOpen();
};

const handleOpenDrawer = () => {
  unref(componentRefs)("drawer1Ref")?.handleOpen();
};
</script>

<style scoped lang="less"></style>
@/hooks/useRefs
