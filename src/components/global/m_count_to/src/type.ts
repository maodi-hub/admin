interface MCountToPropType {
  startVal: number;
  endVal: number;
  duration: number;
  autoPlay: boolean;
  decimals: number;
  decimal: string;
  prefix: string;
  suffix: string;
  separator: string;
  color: string;
  useEasing: boolean;
  transition: keyof typeof import("@vueuse/core")["TransitionPresets"];
}

export type {
  MCountToPropType
}