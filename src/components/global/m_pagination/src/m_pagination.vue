<template>
  <div class="m-pagination">
    <div class="m-paginaiton__wrapper">
      <div class="m-pagination__content p-5">
        <ElScrollbar>
          <ElPagination
            :class="[align]"
            :current-page="config.currentPage"
            :page-size="config.pageSize"
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

import type { PaginationEmitType, PaginationPropType } from "./type";

defineOptions({
  name: "MPagination",
});

withDefaults(defineProps<PaginationPropType>(), {
  config: () => ({
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 50, 100],
    total: 1000,
    layout: ["sizes", "prev", "pager", "next", "jumper", "total"],
  }),
  align: "center",
});

const $emit = defineEmits<PaginationEmitType>();

const handleParsePaginationLayout = (layout: any[]) => {
  return layout ? layout.join(",") : "";
};

const onSizeChange = (v: number) => {
  $emit("sizeChange", v);
  console.log("size", v);
};

const onCurrentChange = (v: number) => {
  $emit("currentChange", v);
  console.log("currentpage", v);
};
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
