<template>

  <component v-model="params[config.prop]" :is="config.type == 'selection' ? 'm-selection': `el-${config.el_type}`" v-bind="searchProps">
      <template #prefix>
        <template v-if="['text', 'selection'].includes(config.type)">
          <component v-if="config.prefix" :is='config.prefix'></component>
          <slot v-else :name="`${config.prop}_prefix`"></slot>
        </template>
      </template>
      <template #suffix>
        <template v-if="config.type == 'text'">
          <component v-if="config.suffix" :is='config.suffix'></component>
          <slot v-else :name="`${config.prop}_suffix`"></slot>
        </template>
      </template>
      <template v-if="config.prepend" #prepend>
        <template v-if="config.type == 'text'">
          <component :is='config.prepend'></component>
        </template>
      </template>
      <template v-if="config.append" #append>
        <template v-if="config.type == 'text'">
          <component :is='config.append'></component>
        </template>
      </template>
  </component>
  <!-- <component v-else :is=''></component> -->
</template>

<script setup lang="ts">
import type { FormItemPropType } from "./type";

import { computed } from "vue";
import { omit } from "lodash";

const $props = withDefaults(defineProps<FormItemPropType>(), {
  params: () => ({})
})

const searchProps = computed(() => {
  const { config } = $props;
  const exclude_prop = ['prefix', 'suffix', "append", "prepend", "tips", "rule", "modifer", "default", "label"];
  return omit(config, ...exclude_prop)
})

</script>

<style scoped></style>