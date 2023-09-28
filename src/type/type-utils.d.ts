type RemoveReadonly<T> = {
  -readonly [K in keyof T]: T[K]
}