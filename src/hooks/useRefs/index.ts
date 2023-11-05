import { computed, getCurrentInstance } from "vue";

export const useRefs = <T extends Record<string, any>>() => {
  const $this = getCurrentInstance();

  if (!$this) throw new Error("this is not setup enviroment");

  const componentRefs = computed(() => {
    const refs = $this.proxy?.$refs as T;
    return <K extends keyof T>(key: K) => {
      const refComp = refs[key] as T[K];
      if (!refComp) return {} as T[K];
      return refComp;
    };
  });

  return {
    componentRefs,
  };
};
