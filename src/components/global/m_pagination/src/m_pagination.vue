<template>
  <div class="m-pagination">
    <div class="m-paginaiton__wrapper">
      <div class="m-pagination__content p-5">
        <ElScrollbar>
          <ElPagination
            :class="[align]"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            :page-sizes="pageSizes"
            :layout="handleParsePaginationLayout(layout)"
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

import { isArray } from "lodash";

defineOptions({
  name: "MPagination",
});

withDefaults(defineProps<PaginationPropType>(), {
  currentPage: 1,
  pageSize: 10,
  pageSizes: () => [10, 20, 30, 50, 100],
  total: 0,
  layout: () => ["sizes", "prev", "pager", "next", "jumper", "total"],
  align: "right",
});

const $emit = defineEmits<PaginationEmitType>();

const handleParsePaginationLayout = (layout: string[]) => {
  if (!isArray(layout)) return "";

  return layout.join(",");
};

const onSizeChange = (v: number) => {
  $emit("sizeChange", v);
};

const onCurrentChange = (v: number) => {
  $emit("currentChange", v);
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
