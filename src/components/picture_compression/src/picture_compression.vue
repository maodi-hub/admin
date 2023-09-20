<template>
  <div class="picture-compression">
    <div class="picture-compression__wrapper">
      <div class="picture-compression__content">
        <el-upload class="upload-demo" drag :auto-upload="false" @change="onFileChange">
          <!-- <el-image :src="fileUrl" /> -->
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </template>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { ElIcon, ElUpload, ElImage } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";

import type { UploadFile, UploadFiles } from "element-plus";

import { imageCompression, readFileDataForUrl } from "./utils";

const fileUrl = ref<Blob | null>();

const onFileChange = async (currentFile: UploadFile, files: UploadFiles) => {
  const file = currentFile.raw;
  if (!file) return;
  const img_base64 = (await readFileDataForUrl(file)) as string;
  if (!img_base64) return;
  const img_compress = await imageCompression(img_base64, 50);
  console.log(img_compress);
  fileUrl.value = img_compress;

  const a = document.createElement("a");
  // a.href = img_compress!;
  // a.download = file.name;
  // a.click();
};
</script>

<style scoped lang="less"></style>
