<template>
  <div class="m-pagination">
    <div class="m-paginaiton__wrapper">
      <div class="m-pagination__content p-5">
        <ElScrollbar>
          <ElPagination
            :class="[algin]"
            v-model:current-page="config.currentPage"
            v-model:page-size="config.pageSize"
            :total="config.total"
            :page-sizes="config.pageSizes"
            :layout="handleParsePaginationLayout(config.layout)"
            @size-change="onSizeChange"
            @current-change="onCurrentChange"
          ></ElPagination>
        </ElScrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElPagination, ElScrollbar } from "element-plus";

import type { PaginationType } from "./type";

interface Props {
  config: PaginationType;
  algin?: "left" | "right" | "center";
}

withDefaults(defineProps<Props>(), {
  algin: "center",
});

const handleParsePaginationLayout = (layout: any[]) => layout.join(",");

const onSizeChange = () => {};

const onCurrentChange = () => {};
</script>

<style scoped lang="less">
.m-pagination {
  &__content {
    background-color: #fff;
  }

  .el-pagination {
    &.right {
      justify-content: flex-end;
    }
    &.center {
      justify-content: safe center;
    }
  }
}
</style>
