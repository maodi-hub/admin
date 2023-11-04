import type { PaginationType } from "@/components/global/m_pagination";
import type { MTableEmitsType, MTablePropType } from "@/components/global/m_table";

interface MTablePagePropType<P = any, CP = any, BR = any> extends MTablePropType<CP> {
  searchParam?: Record<string, any>;
  immediate?: boolean;
  requestDebounce?: number;
  beforeRequest?: (...arg: any[]) => P;
  requestFn?: (arg: P) => Promise<BR> | BR;
  afterResponse?: (
    res: BR,
    set_pagination: (payload: Partial<PaginationType>) => void
  ) => CP[];
  isDeepReactive?: boolean;
  showPagination?: boolean;
  showTool?: boolean;
}

interface MTablePageEmitsType<CP = any> extends MTableEmitsType<CP> {}

export type {
  MTablePagePropType,
  MTablePageEmitsType
}