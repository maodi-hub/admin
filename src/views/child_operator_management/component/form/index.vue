<template>
  <div class="form">
    <div class="form__wrapper">
      <div class="form__content">
        <ElForm>
          <ElFormItem label="运营商ID:">
            <ElSelect v-model="form.carrierId"> </ElSelect>
          </ElFormItem>
        </ElForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption } from "element-plus";

import { reactive } from "vue";

const form = reactive({
  carrierId: "",
});
</script>

<style scoped></style>
