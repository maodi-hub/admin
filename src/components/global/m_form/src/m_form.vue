<template>
  <ElForm :model="params" v-bind="form_base_config">
    <template v-for="item in formItems" :key="item.prop">
      <ElFormItem :label="item.label" :prop="item.prop" :rules="item.rule">
        <template #label="{ label }">
          <el-space :size="2">
            <slot :name="`${item.prop}_label`">{{ label }}</slot>
            <el-tooltip v-if="item.tips" placement="top">
              <template #content>
                <component :is='getTips(item.tips)'/>
              </template>
              <MIcon name="Warning" />
            </el-tooltip>
          </el-space>
        </template>

        <MFormItem :config="item" :params="params">
          <template v-for="slotKey in ['prefix', 'suffix']" :key="slotKey"
            #[`${item.prop}_${slotKey}`]>
            <slot :name="`${item.prop}_${slotKey}`"></slot>
          </template>
        </MFormItem>
      </ElFormItem>
    </template>
  </ElForm>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElTooltip, ElSpace } from "element-plus";
import MFormItem from "./m_form_item.vue";

import type { FormConfigPropType, BaseType } from "./type";

import { watch } from "vue";

import { isFunction } from "@/utils/is";

const $props = withDefaults(defineProps<FormConfigPropType>(), {
  params: () => ({}),
  formItems: () => [],
})

defineOptions({
  name: "MForm"
})

const getTips = (tips: Required<BaseType>['tips']) => {
  return isFunction(tips) ? tips : (() => tips)
}

let reset_fields: Record<string, any> = $props.params;
watch(() => $props.params, (v) => {
  reset_fields = v;
  console.log("set default", reset_fields);
}, {
  deep: false
})
</script>

<style scoped></style>