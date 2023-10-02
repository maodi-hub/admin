type RemoveReadonly<T> = {
  -readonly [K in keyof T]: T[K]
}

type MetaGlobTypeWithDefault<T> = Record<string, { default: T }>;