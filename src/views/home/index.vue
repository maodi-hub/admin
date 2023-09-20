<template>
  <div class="home-container full-page">
    <ElScrollbar view-class="flex fd-column gap-10">
      <InfoCards />

      <div
        class="flex gap-10"
        :class="{
          'fd-column': is_mobile,
        }"
      >
        <template v-for="item in 2" :key="item">
          <ElCard
            shadow="hover"
            :style="{ flex: item == 1 ? '1 1 40%' : '1 1 60%' }"
            :body-style="{ height: '400px', padding: 'unset' }"
            class="min-h-0 min-w-0"
          >
            <MEcharts
              :options="{
                xAxis: {
                  type: 'category',
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                  type: 'value',
                },
                series: [
                  {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true,
                  },
                ],
              }"
            />
          </ElCard>
        </template>
      </div>

      <div
        class="flex gap-10"
        shadow="hover"
        :class="{
          'fd-column': is_mobile,
        }"
      >
        <template v-for="item in 3" :key="item">
          <ElCard
            :body-style="{ height: '400px', padding: 'unset' }"
            class="flex-1 min-h-0 min-w-0"
          >
            <MEcharts
              :options="{
                xAxis: {
                  type: 'category',
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                  type: 'value',
                },
                series: [
                  {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true,
                  },
                ],
              }"
            />
          </ElCard>
        </template>
      </div>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts">
import { ElCard, ElScrollbar } from "element-plus";
import InfoCards from "./components/info_cards/index.vue";

import { ref } from "vue";
const is_mobile = ref(false);
window.addEventListener("resize", () => {
  const width = document.documentElement.clientWidth;
  if (width < 600) {
    is_mobile.value = true;
  } else {
    is_mobile.value = false;
  }
});
</script>

<style scoped lang="less"></style>
