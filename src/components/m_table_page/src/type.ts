import type { MFormPropType } from "@/components/global/m_form";
import type {
  MTableEmitsType,
  MTablePropType,
} from "@/components/global/m_table";
import type { PaginationType } from "@/components/global/m_pagination";

interface MTablePagePropType<P = any, CP = any, BR = any>
  extends MTablePropType<CP>,
    MFormPropType {
  immediate?: boolean;
  requestDebounce?: number;
  beforeRequest?: (...arg: any[]) => P;
  requestFn?: (arg: P) => Promise<BR> | BR;
  afterResponse?: (
    res: BR,
    set_pagination: (payload: Partial<PaginationType>) => void
  ) => CP[];
  isDeepReactive?: boolean;
  showForm?: boolean;
  showTool?: boolean;
  showPagination?: boolean;
}

interface MTablePageEmitsType<CP = any> extends MTableEmitsType<CP> {}

type MTablePageInstance = GenericComponentInstanceType<
  typeof import("./table_page.vue")["default"]
>;

export type { MTablePagePropType, MTablePageEmitsType, MTablePageInstance };
