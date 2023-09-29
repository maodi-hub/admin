import { useSlots } from "vue";

export const RenderSlot = () => {
  const $slot = useSlots();
  if (!Object.keys($slot).length) return;
  return (
    <>
      {Object.entries($slot).reduce(
        (pre, [key, renderFn]) => ((pre[key] = renderFn!), pre),
        {} as Record<string, any>
      )}
    </>
  );
};
