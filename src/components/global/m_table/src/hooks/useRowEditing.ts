import { ref, unref } from "vue";

type RowSatetType = Record<string, boolean>;
export function useRowEditing() {
  const editingRows = ref<RowSatetType>({});

  const getRowState = (index: number) => {
    return !!unref(editingRows)[index];
  }

  const setRowsState = (index: number, state: boolean) => {
    editingRows.value[index] = state;
  }
  
  const clearRowsState = () => {
    editingRows.value = {}
  }
  return {
    editingRows,
    getRowState,
    setRowsState,
    clearRowsState
  };
}
