import { ElTableColumn, ElTable, ElPagination } from "element-plus";

import type { VNode } from "vue";
import type { TableColumnCtx } from "element-plus";
import type { AxiosRequestConfig } from "axios";
import type { FormConfigPropType } from "../../m_form";

type RenderScopeType<T> = {
  row: T;
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

type HeaderRenderScopeType<T> = {
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

type ElTableColumnType = InstanceType<typeof ElTableColumn>["$props"];
type ElTableType = InstanceType<typeof ElTable>["$props"];
type ElPaginationType = InstanceType<typeof ElPagination>["$props"];


interface TableColumnType<D = any>
  extends Omit<ElTableColumnType, "renderHeader"> {
  render_header?: (data: HeaderRenderScopeType<D>) => VNode;
  render_cell?: (data: RenderScopeType<D>) => VNode;
}

interface TableType<D = any>
  extends Pick<
    ElTableType,
    | "border"
    | "currentRowKey"
    | "stripe"
    | "headerCellStyle"
    | "headerCellClassName"
    | "cellStyle"
    | "cellClassName"
    | "headerRowStyle"
    | "headerRowClassName"
    | "onCell-click"
    | "onCell-dblclick"
    | "onCell-contextmenu"
    | "onCell-mouse-enter"
    | "onCell-mouse-leave"
    | "onRow-click"
    | "onRow-dblclick"
    | "onRow-contextmenu"
    | "onHeader-click"
    | "onHeader-contextmenu"
    | "onHeader-dragend"
    | "onSort-change"
    | "onSelect-all"
    | "onSelection-change"
    | "tooltipOptions"
  > {
  onLoadMore?: () => void;
  handleLoadData?: ((...arg: any[]) => any) | AxiosRequestConfig;
  handleProcseeData?: (...arg: any) => D[];
}

interface PaginationType {
  currentPage: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
  layout: string[];
}

interface UseTableHookConfigType<D = any> {
  table_data: D[];
  loading: boolean;
  pagination: PaginationType;
}

interface TableConfigPropType<D> {
  form_config?: FormConfigPropType;
  table_config?: TableType<D>;
  columns?: TableColumnType<D>[];
  max_height?: number | string;
  table_height?: string | number;
  show_pagination?: boolean;
  show_form?: boolean;
}

export type {
  TableColumnType,
  TableType,
  RenderScopeType,
  HeaderRenderScopeType,
  UseTableHookConfigType,
  PaginationType,
  TableConfigPropType
};
