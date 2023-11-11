interface OptionProps {
  label: string | number;
  value: string | number;
  disabled?: string | number;
  type?: "success" | "info" | "warning" | "danger" | "";
}

type EnumOptionType<T = any> = T[] | ((...arg: any[]) => Promise<T[]> | T[]);

export type { OptionProps, EnumOptionType };
