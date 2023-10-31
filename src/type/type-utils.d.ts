type RemoveReadonly<T> = {
  -readonly [K in keyof T]: T[K];
};

type MetaGlobTypeWithDefault<T> = Record<string, { default: T }>;

type enumTagType = {
  value: any;
  label: string | number;
  disabled?: boolean;
  type?: "" | "success" | "warning" | "info" | "danger";
};

type enumFnType = () => Promise<enumTagType[]> | enumTagType[];

/**泛型组件实例类型 */
type GenericComponentInstanceType<D extends (...p: any[]) => any> =
  //组件通用类型
  import("vue").ComponentPublicInstance &
    //defineExpose暴露的数据类型
    Parameters<NonNullable<NonNullable<ReturnType<D>["__ctx"]>["expose"]>>[0];
