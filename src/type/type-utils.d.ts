type RemoveReadonly<T> = {
  -readonly [K in keyof T]: T[K]
}

type MetaGlobTypeWithDefault<T> = Record<string, { default: T }>;

type enumFnType = () => Promise<any[]> | any[]