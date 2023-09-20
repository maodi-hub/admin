<template>
  <div class="info-cards">
    <div class="info-cards__wrapper">
      <div class="info-cards__content flex gap-10">
        <template v-for="item in 4" :key="item">
          <Card />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { Card } from "./render";
</script>

<style scoped></style>
