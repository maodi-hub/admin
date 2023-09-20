<template>
  <div ref="echarts_ref" :style="{ width, height: height || '100%' }"></div>
</template>

<script setup lang="ts">
import type { ECOption } from "@/hooks/useEcharts";

import { ref, onMounted, watch } from "vue";

import { useEcharts } from "@/hooks/useEcharts";

interface Props {
  height?: string;
  width?: string;
  options?: ECOption;
}
const $props = defineProps<Props>();

defineOptions({
  name: "MEcharts",
});

const echarts_ref = ref<HTMLDivElement>();
const { init, options } = useEcharts(echarts_ref, $props.options);

watch(
  () => $props.options,
  (v) => {
    v && (options.value = v);
  }
);

onMounted(init);
</script>

<style scoped></style>
