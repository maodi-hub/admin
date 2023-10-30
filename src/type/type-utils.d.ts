type RemoveReadonly<T> = {
  -readonly [K in keyof T]: T[K]
}

type MetaGlobTypeWithDefault<T> = Record<string, { default: T }>;

type enumTagType = { value: any, label: string | number, disabled?: boolean, type?: "" | "success" | "warning" | "info" | "danger" };

type enumFnType = () => Promise<enumTagType[]> | enumTagType[]