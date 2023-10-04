import { ElTable } from "element-plus";

import type { VNode } from "vue";
import type { TableColumnCtx } from "element-plus";
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
  handleLoadData?: (...arg: any[]) => Promise<any> | any;
  handleProcseeData?: <T>(
    data: T,
    set_pagination: (payload: Partial<PaginationType>) => void
  ) => D[];
  handleProcessParam?: (
    params?: Record<string, any>,
    pagination?: PaginationType
  ) => Record<string, any>;
  defaultValue?: string | number; // cell 无参时默认显示的文案
  rowKey?: string;
}

type TagType = {
  value: string;
  label: string;
  type: "success" | "info" | "warning" | "danger" | "";
};
interface TableColumnType<D = any>
  extends Omit<
      Partial<TableColumnCtx<D>>,
      "renderHeader" | "children" | "formatter"
    >,
    Pick<TableType, "defaultValue"> {
  render_header?: (data: HeaderRenderScopeType<D>) => VNode;
  render_cell?: (data: RenderScopeType<D>) => VNode;
  optionEnumFn?: EnumFnType<TagType>;
  _formatter?: (
    row: Record<string, any>,
    column: TableColumnType<D>,
    cellValue: any,
    $index: number
  ) => any;
  renderType?: "tag" | "edit";
  _children?: TableColumnType<D>[];
  uniqueKey: string;
  headerTextWrap?: boolean;
}

interface TableConfigPropType<D> extends FormConfigPropType {
  title?: string; // 导出表格时的名字
  table_config?: TableType<D>;
  immediate?: boolean;
  other_ope?: string[];
  columns?: TableColumnType<D>[];
  max_height?: number | string;
  table_height?: string | number;
  pagination_config?: Partial<PaginationType>;
  pagination_position?: "left" | "center" | "right";
  show_pagination?: boolean;
  show_form?: boolean;
}

export type {
  TableColumnType,
  TableType,
  RenderScopeType,
  HeaderRenderScopeType,
  TableConfigPropType,
  TagType,
};
