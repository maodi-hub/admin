import type { FormItemRule, TableColumnCtx } from "element-plus";
import type { Arrayable } from "@vueuse/core";
import type { VNode } from "vue";

interface RenderScope<T> {
  row: T;
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

interface HeaderRenderScope<T>  {
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

interface MTablePropType<P = any, CP = any> {
  border?: boolean;
  stripe?: boolean;
  rowKey?: string;
  immediate?: boolean;
  defaultValue?: string | number;
  height?: string;
  maxHeight?: string;
  beforeRequest?: (...arg: any[]) => P;
  columns?: (MTableColumnPropType<CP> | MTableColumnEditPropType<CP>)[];
  data?:CP[];
}

type CustomerRenderType<CP, T extends "formatter" | "render"> = (
  row: CP,
  cellValue: any,
  index: number,
  column: MTableColumnEditPropType<CP> | MTableColumnPropType<CP>
) => T extends "formatter" ? string | number : VNode;

type CellAlignType =  "right" | "left" | "center" | (string & {});
type ColumnFixedPositionType = "right" | "left" | boolean

interface MTableColumnPropType<CP = any> extends Pick<MTablePropType, "defaultValue"> {
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
  _children?: (MTableColumnPropType<CP> | MTableColumnEditPropType<CP>)[];
}

interface MTableColumnEditPropType<CP = any> extends MTableColumnPropType<CP> {
  prop: string;
  rule?: Arrayable<FormItemRule>;
}

export type { MTablePropType, MTableColumnPropType, MTableColumnEditPropType, RenderScope, HeaderRenderScope };
