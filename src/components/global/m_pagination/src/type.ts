interface PaginationType {
  currentPage: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
  layout: string[];
}

interface PaginationPropType extends PaginationType {
  align?: 'left' | 'center' | 'right'
}

interface PaginationEmitType {
  (e:"sizeChange", v: number): void;
  (e: "currentChange", v: number): void;
}

export type {
  PaginationType,
  PaginationPropType,
  PaginationEmitType
}