import { MaybeRef, ref } from "vue";
import type { TableColumnType } from "../../../m_table/src/type"; 

type GetFormParamType<T extends 'table' | 'form'> = T extends 'table' ? TableColumnType[] : Record<string, unknown>

export function useForm<T extends 'table' | 'form'>(param: MaybeRef<GetFormParamType<T>>) {
  const form = ref({});
  return {
    form
  }
}