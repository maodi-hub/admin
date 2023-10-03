type RemoveReadonly<T> = {
  -readonly [K in keyof T]: T[K]
}

type MetaGlobTypeWithDefault<T> = Record<string, { default: T }>;

type EnumFnType<T> = (...arg: any[]) => Promise<T[]> | T[]