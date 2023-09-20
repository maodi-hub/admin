<template>
  <div class="login-page full-page flex jc-center ai-center">
    <LoginForm />
    <div class="operation flex gap-20">
      <ComponentSize />
      <Language />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoginForm } from "@/components/login_form";
import ComponentSize from "@/layout/components/component_size/index.vue";
import Language from "@/layout/components/language/index.vue";
</script>

<style scoped lang="less">
.login-page {
  position: relative;
  .operation {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
