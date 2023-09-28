<template>
  <div class="table full-page">
    <MTable table_height="100%">
      <template #table_form>
        <Form />
      </template>
    </MTable>
  </div>
</template>

<script setup lang="ts">
import Form from "./component/form/index.vue";
</script>

<style scoped lang="less"></style>
