import type { FormItemRule, TableColumnCtx } from "element-plus";
import type { Arrayable } from "@vueuse/core";
import type { VNode } from "vue";
import type { PaginationType } from "../../m_pagination";

interface RenderScope<T> {
  row: T;
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
}

interface HeaderRenderScope<T> {
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
}

type MTableColumnType<CP = any> =
  | MTableColumnPropType<CP>
  | MTableColumnEditPropType<CP>;

interface MTablePropType<P = any, CP = any, BR = any> {
  searchParam?: Record<string, any>;
  border?: boolean;
  stripe?: boolean;
  rowKey?: string;
  immediate?: boolean;
  defaultValue?: string | number;
  height?: string;
  maxHeight?: string;
  requestDebounce?: number;
  beforeRequest?: (...arg: any[]) => P;
  requestFn?: (arg: P) => BR;
  afterResponse?: (
    res: BR,
    set_pagination: (payload: Partial<PaginationType>) => void
  ) => CP[];
  columns?: MTableColumnType<CP>[];
  isDeepReactive?: boolean;
  showPagination?: boolean;
  showTool?: boolean;
}

type CustomerRenderType<CP, T extends "formatter" | "render"> = (
  row: CP,
  cellValue: any,
  index: number,
  column: MTableColumnType<CP>
) => T extends "formatter" ? string | number : VNode;

type CellAlignType = "right" | "left" | "center" | (string & {});
type ColumnFixedPositionType = "right" | "left" | boolean;

interface MTableColumnPropType<CP = any>
  extends Pick<MTablePropType, "defaultValue"> {
  type?: "index" | "selection" | "expand" | "tag" | "text";
  label?: string;
  prop?: string;
  width?: string | number;
  minWidth?: string | number;
  headerAlign?: CellAlignType;
  cellAlign?: CellAlignType;
  uniqueKey: string | number;
  fixed?: ColumnFixedPositionType;
  isShow?: boolean;
  showOverflowToolTip?: boolean;
  _renderCell?: CustomerRenderType<CP, "render">;
  _renderHeader?: () => VNode;
  _formatter?: CustomerRenderType<CP, "formatter">;
  _children?: MTableColumnType<CP>[];
  enumOptionFn?: enumFnType;
}

interface MTableColumnEditPropType<CP = any> extends MTableColumnPropType<CP> {
  prop: string;
  rule?: Arrayable<FormItemRule>;
}

type MTableInstance = GenericComponentInstanceType<
  typeof import("./table.vue")["default"]
>;

export type {
  MTableInstance,
  MTablePropType,
  MTableColumnPropType,
  MTableColumnEditPropType,
  MTableColumnType,
  RenderScope,
  HeaderRenderScope,
};
