import type { TableColumnType, HeaderRenderScopeType, RenderScopeType } from "./type";

export function HeaderColumn(
  tableColumn: TableColumnType,
  scope: HeaderRenderScopeType<any>
) {
  const { render_header } = tableColumn;

  if (render_header) return tableColumn.render_header!(scope)
  return <>{tableColumn?.label || ""}</>;
}

export function ColColumn(
  tableColumn: TableColumnType,
  scope: RenderScopeType<any>
) {
  const { render_cell } = tableColumn;
  const row = scope.row || {};
  if (render_cell) return tableColumn.render_cell!(scope);
  return <>{row[tableColumn?.prop || ""]}</>;
}
