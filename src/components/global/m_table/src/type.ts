import { ElTable } from "element-plus";

import type { VNode } from "vue";
import type { TableColumnCtx } from "element-plus";
import type { AxiosRequestConfig } from "axios";
import type { FormConfigPropType } from "../../m_form";
import type { PaginationType } from "../../m_pagination";

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

type ElTableType = InstanceType<typeof ElTable>["$props"];

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
  isDeepReactive?: boolean;
  onLoadMore?: () => void;
  handleLoadData?: (...arg: any[]) => Promise<any>;
  handleProcseeData?: (...arg: any) => D[];
  handleProcessParam?: (params?: Record<string, any>, pagination?: PaginationType) => Record<string, any>
  defaultValue?: string | number; // cell 无参时默认显示的文案
  rowKey?: string
}

interface TableColumnType<D = any>
  extends Omit<Partial<TableColumnCtx<D>>, "renderHeader">, Pick<TableType, "defaultValue"> {
  render_header?: (data: HeaderRenderScopeType<D>) => VNode;
  render_cell?: (data: RenderScopeType<D>) => VNode;
}

interface TableConfigPropType<D> extends FormConfigPropType {
  title?: string; // 导出表格时的名字
  table_config?: TableType<D>;
  other_ope?: string[];
  columns?: TableColumnType<D>[];
  max_height?: number | string;
  table_height?: string | number;
  pagination_config?: Partial<PaginationType>;
  pagination_position?: 'left' | 'center' | 'right';
  show_pagination?: boolean;
  show_form?: boolean;
}

export type {
  TableColumnType,
  TableType,
  RenderScopeType,
  HeaderRenderScopeType,
  TableConfigPropType
};
