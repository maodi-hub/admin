import { nextTick, ref, unref } from "vue";

import type { TableColumnType } from "../type";

interface UseRowEditingOptionType {
  mutiple?: boolean;
  model?: "row" | "cell";
}

type CellStateType = Record<string, boolean>;

export function useRowEditing(option: UseRowEditingOptionType) {
  const { mutiple = true, model = "row" } = option;
  const editingRows = ref<CellStateType[]>([]);
  const changedRows = ref<Record<string, boolean>>({});

  // 在点击时显示整行可编辑的单元格， 请先初始化
  const iniEditingRows = (columns: TableColumnType[], data: any[]) => {
    default_keys = columns
      .filter(({ prop }) => !!prop)
      .map(({ prop }) => prop!);
    data.forEach((_, idx) => {
      setRows(idx, getDefaultCellValue());
    });
  };

  let default_keys: string[];
  const getDefaultCellValue = () => {
    return default_keys
      ? default_keys.reduce(
          (pre, cur) => ((pre[cur] = false), pre),
          {} as CellStateType
        )
      : {};
  };

  const setRows = (index: number, payload: CellStateType) => {
    console.trace("ada");
    editingRows.value[index] = payload;
  };

  const setEditingRows = async (
    index: number,
    prop: string,
    state: boolean,
    init?: boolean
  ) => {
    let obj = editingRows.value[index];
    if (!obj) {
      obj = getDefaultCellValue();
    }

    if (!init && !mutiple) {
      editingRows.value = unref(editingRows).map(() => getDefaultCellValue());
      await nextTick();
    }

    if (!init && model == "row") {
      obj = Object.keys(obj).reduce((pre, cur) => {
        pre[cur] = state;
        return pre;
      }, {} as CellStateType);
    }

    setRows(index, Object.assign(obj, { [prop]: state }));
  };

  const setChangedRows = (index: number, v: boolean) => {
    changedRows.value[index] = v;
  };

  const getCurrentRowEditState = (index: number) => {
    const state = unref(editingRows)[index];
    return Object.values(state).includes(true);
  };

  const getCurrentRowChangeState = (index: number) => {
    const state = unref(changedRows)[index];
    return !!state;
  };

  const cancelEditing = (index?: number) => {
    if (index || index == 0) {
      setChangedRows(index, false);
      setRows(index, getDefaultCellValue());
      return;
    }
    Object.keys(unref(changedRows)).forEach((idx) => {
      setChangedRows(+idx, false);
      setRows(+idx, getDefaultCellValue());
    });
  };

  const clearEditingRows = () => {
    editingRows.value = [];
    changedRows.value = {};
  };
  return {
    editingRows,
    changedRows,
    iniEditingRows,
    setEditingRows,
    setChangedRows,
    getCurrentRowChangeState,
    getCurrentRowEditState,
    clearEditingRows,
    cancelEditing,
  };
}
