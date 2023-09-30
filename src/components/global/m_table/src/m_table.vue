<template>
  <div class="m-table" :class="{ unset_height }">
    <div class="m-table__wrapper" :class="{ unset_height }">
      <div class="m-table__content flex fd-column" :class="{ unset_height }">
        <div class="m-table__form p-5 mb-5" v-if="show_form">
          <slot name="table_form" :form_param="params">
            <div class="base_form__container flex f-wrap gap-5 jc-between">
              <div class="flex-1 min-w-0 ">
                <MForm :params="params" :form_base_config="form_base_config" :form-items="formItems">
                </MForm>
              </div>
              <div class="ope-btn flex fd-column gap-5">
                <el-button type="primary">
                  搜索
                </el-button>
                <el-button type="danger">
                  重置
                </el-button>
              </div>
            </div>
          </slot>
        </div>
        <div class="m-tabel__ope flex jc-between ai-center p-5">
          <div class="adcc__ope">
            <el-button type="primary">
              增加
            </el-button>
            <el-button type="danger">
              删除
            </el-button>
            <el-button type="primary" plain>
              批量增加
            </el-button>
            <el-button type="danger" plain>
              批量删除
            </el-button>
          </div>

          <div class="other__ope">
            <el-button icon="Refresh" circle></el-button>
            <el-button icon="Download" circle></el-button>
          </div>
        </div>
        <div class="m-table__main flex-1 min-h-0 min-w-0 p-5 mb-5"
          :class="{ unset_height: !max_height && table_height != '100%' }">
          <ElTable v-bind="merge_table_config" :height="getHeight.height" :max-height="getHeight.maxHeight"
            :data="table_data" v-loading="loading" v-bottom-loading="table_config.onLoadMore" ref="table_ref">
            <template v-for="(col, col_index) in columns" :key="col['column-key'] || col_index">
              <TableColumn :column="col" :base_config="table_config">
                <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                  <slot :name="slot" v-bind="scope" />
                </template>
              </TableColumn>
            </template>
          </ElTable>
        </div>
        <div class="m-table__footer" v-if="show_pagination">
          <MPaginaiton :config="pagination" algin="left" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="D">
import { ElTable } from "element-plus";
import { MForm } from "../../m_form";
import MPaginaiton from "./m_pagination.vue";

import type { TableConfigPropType } from "./type";

import { computed, unref } from "vue";
import { omit } from "lodash";

import { TableColumn } from "./render";

import { vLoading } from "element-plus";
import { vBottomLoading } from "./directives";

import { useTable } from "./hooks/useTable";
import { useRefs } from "@/hooks/useRefs";

defineOptions({
  name: "MTable",
});

const $props = withDefaults(defineProps<TableConfigPropType<D>>(), {
  form_base_config: () => ({}),
  table_config: () => ({}),
  columns: () => [],
  show_form: true,
  show_pagination: true
});

const {
  handleFetchData,
  handleSetPagenation,
  pagination,
  table_data,
  loading,
} = useTable($props);
const { componentRefs } = useRefs<{
  table_ref: InstanceType<typeof ElTable>;
}>();

const DEFAULT_TABLE_CONFIG = {
  border: true,
  stripe: true,
  headerCellStyle: { backgroundColor: "#F2F3F5" },
};
const merge_table_config = computed(() => {
  const { table_config } = $props;
  return Object.assign({}, DEFAULT_TABLE_CONFIG, omit(table_config, 'onLoadMore', 'handleLoadData', "handleProcseeData", 'default'));
});

const unset_height = computed(() => {
  const { max_height, table_height } = $props;

  return !!max_height || !!(table_height !== "100%");
});

const getHeight = computed(() => {
  const { max_height, table_height } = $props;
  return {
    height: max_height ? undefined : table_height || "unset",
    maxHeight: max_height || "unset",
  };
});

const getTableRef = () => unref(componentRefs)("table_ref");

defineExpose({
  handleFetchData,
  handleSetPagenation,
  getTableRef,
});
</script>

<style scoped lang="less">
.m-table {
  height: 100%;

  &__wrapper {
    height: 100%;
  }

  &__content {
    height: 100%;

    .m-table__form {
      background-color: #fff;

      .base_form__container {
        min-width: min-content;
      }

      .ope-btn {
        width: min-content;

        .el-button+.el-button {
          margin-left: 0;
        }
      }
    }

    .m-tabel__ope {
      background-color: #fff;
      white-space: nowrap;
    }

    .m-table__main {
      background-color: #fff;

      .el-table {
        :deep(.el-table__header) {
          .cell {
            white-space: nowrap;
          }
        }
      }
    }
  }
}

.unset_height {
  flex: unset;
  height: unset;
}
</style>