<template>
  <component v-model="params[config.prop]" :is="`el-${config.el_type}`" v-bind="searchProps">
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
      <!-- <template v-if="config.el_type == 'select'">
      <component
        :is="`el-option`"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      ></component>
    </template> -->
  </component>
</template>

<script setup lang="ts">
import type { FormItemPropType } from "./type";

import { computed } from "vue";

import { omit } from "lodash";

interface Emits {
  (e: "update:params", v: FormItemPropType['params']): void
}

const $props = withDefaults(defineProps<FormItemPropType>(), {
  params: () => ({})
})

const $emit = defineEmits<Emits>();

const searchProps = computed(() => {
  const { config } = $props;
  return omit(config, 'prefix', 'suffix', "append", "prepend", "tips")
})

</script>

<style scoped></style>