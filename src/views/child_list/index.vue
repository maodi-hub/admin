<template>
  <div>child_list {{ $route.fullPath }}</div>
</template>

<script setup lang="ts">
import { onMounted, onActivated } from "vue";
import { useRoute } from "vue-router";

const $route = useRoute();

onMounted(() => {
  console.log($route.path + " 挂载");
});

onActivated(() => {
  console.log($route.path + " 激活");
});
</script>

<style scoped></style>
