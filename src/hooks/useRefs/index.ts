import { computed, getCurrentInstance } from "vue";

export const useRefs = <T>() => {
  const $this = getCurrentInstance();

  const componentRefs = computed(() => {
    const refs = $this?.proxy?.$refs as Record<keyof T, unknown>;
    return <K extends keyof T>(key: K) => {
      const refComp = refs![key] as T[K];
      if (!refComp) return;
      return refComp;
    };
  });

  return {
    componentRefs,
  };
};
