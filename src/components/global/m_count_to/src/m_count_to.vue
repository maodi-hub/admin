<template>
  <span :style="{ color }">
    {{ value }}
  </span>
</template>
<script lang="ts" setup>
import { ref, computed, watchEffect, unref, onMounted, watch } from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";
import { isNumber } from "@/utils/is";

interface Props {
  startVal: number;
  endVal: number;
  duration: number;
  autoPlay: boolean;
  decimals: number;
  decimal: string;
  prefix: string;
  suffix: string;
  separator: string;
  color: string;
  useEasing: boolean;
  transition: keyof typeof TransitionPresets;
}

interface Emits {
  (e: "onStarted"): void;
  (e: "onFinished"): void;
}
const $props = withDefaults(defineProps<Partial<Props>>(), {
  startVal: 0,
  endVal: 2023,
  duration: 1500,
  autoPlay: true,
  decimals: 0,
  decimal: ".",
  prefix: "",
  suffix: "",
  separator: ",",
  useEasing: true,
  transition: "linear",
});

const $emit = defineEmits<Emits>();

defineOptions({
  name: "MCountTo",
});

const source = ref($props.startVal);
const disabled = ref(false);
let outputValue = useTransition(source);

const value = computed(() => formatNumber(unref(outputValue)));

watchEffect(() => {
  source.value = $props.startVal;
});

watch([() => $props.startVal, () => $props.endVal], () => {
  if ($props.autoPlay) {
    start();
  }
});

onMounted(() => {
  $props.autoPlay && start();
});

function start() {
  run();
  source.value = $props.endVal;
}

function reset() {
  source.value = $props.startVal;
  run();
}

function run() {
  outputValue = useTransition(source, {
    disabled,
    duration: $props.duration,
    onFinished: () => $emit("onFinished"),
    onStarted: () => $emit("onStarted"),
    ...($props.useEasing ? { transition: TransitionPresets[$props.transition] } : {}),
  });
}

function formatNumber(num: number | string) {
  if (!num && num !== 0) {
    return "";
  }
  const { decimals, decimal, separator, suffix, prefix } = $props;
  num = Number(num).toFixed(decimals);
  num += "";

  const x = num.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? decimal + x[1] : "";

  const rgx = /(\d+)(\d{3})/;
  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + separator + "$2");
    }
  }
  return prefix + x1 + x2 + suffix;
}
</script>
