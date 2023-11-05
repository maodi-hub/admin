import type { FormItemRule, TableColumnCtx } from "element-plus";
import type { Arrayable } from "@vueuse/core";
import type { VNode } from "vue";

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

interface MTablePropType<CP = any> {
  border?: boolean;
  stripe?: boolean;
  rowKey?: string;
  defaultValue?: string | number;
  height?: string;
  maxHeight?: string;
  columns?: MTableColumnType<CP>[];
  data?: CP[];
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
  type?: "index" | "selection" | "expand" | "tag" | "text" | "radio" | "sort";
  label?: string;
  prop?: string;
  width?: string | number;
  minWidth?: string | number;
  headerAlign?: CellAlignType;
  cellAlign?: CellAlignType;
  uniqueKey: string;
  fixed?: ColumnFixedPositionType;
  isShow?: boolean;
  showOverflowToolTip?: boolean;
  showOverflowHeadToolTip?: boolean;
  _renderCell?: CustomerRenderType<CP, "render">;
  _renderHeader?: () => VNode;
  _formatter?: CustomerRenderType<CP, "formatter">;
  _children?: MTableColumnType<CP>[];
  sortable?: boolean;
  enumOptionFn?: enumFnType;
}

interface MTableColumnEditPropType<CP = any> extends MTableColumnPropType<CP> {
  prop: string;
  rule?: Arrayable<FormItemRule>;
}

interface MTableEmitsType<CP> {
  (e: "radioChange", newValue?: CP, oldValue?: CP): void;
}

interface SelectionHookOptionType {
  dataKey: string;
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
  MTableEmitsType,
  SelectionHookOptionType,
  RenderScope,
  HeaderRenderScope,
};
