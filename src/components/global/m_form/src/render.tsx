// import { VNode, useSlots } from "vue";
// import type { InputType, TextAreaType } from "./type";
// import config from "@/api/config";

// export const RenderSlot = (props: {
//   config: InputType | TextAreaType;
//   slotKey: string;
// }) => {
//   const { config, slotKey } = props;
//   return (
//     <>
//       {config.type == "text" && (
//         <RenderInput config={config} slotKey={slotKey} />
//       )}
//     </>
//   );
// };

// const RenderInput = (props: { config: InputType; slotKey: string }) => {
//   const $slot = useSlots();
//   const { config, slotKey } = props;
//   if (config[slotKey]) return config[slotKey]() as VNode;
//   const prop_name = `${config.prop}_${slotKey}`
//   return (
//     <>
//       {{
//         [prop_name]: () => $slot[prop_name]!(),
//       }}
//     </>
//   );
// };
