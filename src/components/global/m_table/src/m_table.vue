<template>
  <div class="m-table" :class="{ unset_height }">
    <div class="m-table__wrapper" :class="{ unset_height }">
      <div class="m-table__content flex fd-column" :class="{ unset_height }">
        <div class="m-table__form p-5 mb-5" v-if="show_form">
          <slot name="table_form" :form_param="params">
            <div class="base_form__container flex f-wrap gap-5 jc-between">
              <div class="flex-1 min-w-0">
                <MForm
                  ref="form_ref"
                  :params="params"
                  :form_base_config="form_base_config"
                  :form-items="formItems"
                >
                </MForm>
              </div>
              <div class="ope-btn flex fd-column gap-5">
                <el-button type="primary" @click="handleGetTableData"> 搜索 </el-button>
                <el-button type="danger" @click="handleResetFields"> 重置 </el-button>
              </div>
            </div>
          </slot>
        </div>
        <div class="m-tabel__ope flex jc-between ai-center p-5">
          <div class="adcc__ope">
            <slot name="adcc_ope">
              <el-button type="primary"> 增加 </el-button>
              <el-button type="danger"> 删除 </el-button>
              <el-button type="primary" plain> 批量增加 </el-button>
              <el-button type="danger" plain> 批量删除 </el-button>
            </slot>
          </div>

          <div class="other__ope">
            <slot name="other_ope">
              <el-button icon="Refresh" circle @click="handleGetTableData"></el-button>
              <el-button icon="Download" circle></el-button>
            </slot>
          </div>
        </div>
        <div
          class="m-table__main flex-1 min-h-0 min-w-0 p-5 mb-5"
          :class="{ unset_height: !max_height && table_height != '100%' }"
        >
          <ElTable
            v-bind="merge_table_config"
            :height="getHeight.height"
            :max-height="getHeight.maxHeight"
            :data="table_data"
            v-loading="loading"
            v-bottom-loading="table_config.onLoadMore"
            ref="table_ref"
          >
            <!-- 默认插槽 -->
            <slot />

            <template
              v-for="(col, col_index) in columns"
              :key="col['column-key'] || col_index"
            >
              <el-table-column
                v-if="col.type && columnType.includes(col.type)"
                v-bind="col"
                :align="col.align ?? 'center'"
                :reserve-selection="col.type == 'selection'"
              >
                <template #default="scope">
                  <!-- expand -->
                  <template v-if="col.type == 'expand'">
                    <slot :name="col.type" v-bind="scope" />
                  </template>
                  <!-- radio -->
                  <el-radio
                    v-if="col.type == 'radio'"
                    v-model="radio"
                    :label="scope.row[table_config?.rowKey || 'id']"
                  >
                    <i></i>
                  </el-radio>
                </template>
              </el-table-column>

              <MTableColumn v-else :column="col" :base_config="table_config">
                <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                  <slot :name="slot" v-bind="scope" />
                </template>
              </MTableColumn>
            </template>

            <!-- 末尾添加行 -->
            <template #append>
              <slot name="append"></slot>
            </template>

            <!-- 空数据显示 -->
            <template #empty>
              <slot name="empty">
                <el-empty description="无数据" />
              </slot>
            </template>
          </ElTable>
        </div>
        <div class="m-table__footer" v-if="show_pagination">
          <MPagination
            :config="pagination"
            :align="pagination_position"
            @size-change="onPageSizeChange"
            @current-change="onPageCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="D">
import { ElTable, ElEmpty, ElTableColumn } from "element-plus";
import { MForm } from "../../m_form";

import type { TableConfigPropType } from "./type";

import { computed, ref, toRaw, unref } from "vue";
import { omit, pick } from "lodash";

import { MTableColumn } from "./render";

import { vLoading } from "element-plus";
import { vBottomLoading } from "./directives";

import { useTable } from "./hooks";
import { useRefs } from "@/hooks/useRefs";

defineOptions({
  name: "MTable",
});

const $props = withDefaults(defineProps<TableConfigPropType<D>>(), {
  form_base_config: () => ({
    inline: true,
    labelWidth: "80px",
  }),
  table_config: () => ({}),
  columns: () => [],
  pagination_position: "left",
  show_form: true,
  show_pagination: true,
});

const columnType = ["index", "selection", "expand", "radio"];

const radio = ref("");

const {
  handleFetchData,
  handleSetPagenation,
  table_data,
  pagination,
  loading,
} = useTable($props.table_config, $props.pagination_config);

const { componentRefs } = useRefs<{
  table_ref: InstanceType<typeof ElTable>;
  form_ref: InstanceType<typeof MForm>;
}>();

const DEFAULT_TABLE_CONFIG = {
  border: true,
  stripe: true,
  headerCellStyle: { backgroundColor: "#F2F3F5" },
};
const merge_table_config = computed(() => {
  const { table_config } = $props;
  return Object.assign(
    {},
    DEFAULT_TABLE_CONFIG,
    omit(table_config, "onLoadMore", "handleLoadData", "handleProcseeData", "default")
  );
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

const onPageSizeChange = (v: number) => {
  handleSetPagenation({ pageSize: v });
  handleGetTableData();
};
const onPageCurrentChange = (v: number) => {
  handleSetPagenation({ currentPage: v });
  handleGetTableData();
};

const handleGetTableData = () => {
  const { params } = $props;
  const { handleProcessParam } = $props.table_config;
  const param = handleProcessParam
    ? handleProcessParam(toRaw(params), toRaw(pagination))
    : { ...params, ...pick(pagination, "currentPage", "pageSize") };
  handleFetchData(param);
};

const handleResetFields = () => {
  unref(componentRefs)("form_ref")?.handleResetFields();
};

const getInstance = () => unref(componentRefs);

defineExpose({
  getInstance,
  handleGetTableData,
  handleResetFields,
  handleSetPagenation,
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

        .el-button + .el-button {
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
./hooks
