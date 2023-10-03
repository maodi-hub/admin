<template>
  <div class="component-size">
    <div class="component-size__wrapper">
      <div class="component-size__content">
        <el-dropdown @command="onCommandChange">
          <el-image
            :src="img_language"
            loading="eager"
            style="width: 24px"
            class="pointer"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="item in language_options" :key="item.value">
                <el-dropdown-item
                  :command="item.value"
                  :disabled="$global.language == item.value"
                >
                  {{ item.label }}
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import img_language from "@/assets/icons/language.png?inline";

import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElImage } from "element-plus";

import { computed, unref } from "vue";

import { useI18n } from "vue-i18n";

import { useGlobalStore } from "@/store/modules/global";

import { LANGUAGE_CONFIG } from "./const";

const { messages } = useI18n();
const $global = useGlobalStore();

const language_options = computed(() => {
  return Object.keys(unref(messages)).map((lang) => {
    const available_lang = LANGUAGE_CONFIG[lang];
    if (available_lang) {
      return {
        label: available_lang,
        value: lang,
      };
    }
    return {
      label: lang,
      value: lang,
    };
  });
});

const onCommandChange = (name: string) => {
  $global.setLanguage(name);
};
</script>

<style scoped></style>
