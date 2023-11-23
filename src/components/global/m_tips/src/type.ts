import type { VNode } from "vue";

interface MTipsPropType {
  tips?: string | (() => VNode);
}

export type { MTipsPropType };
