import type { DialogBeforeCloseFn } from "element-plus";

interface BaseModalPropType {
  visible?: boolean;
  title?: string;
  width?: string | number;
  to_body?: boolean;
  dialog_before_close?: DialogBeforeCloseFn;
  show_close_icon?: boolean;
}

interface BaseDialogPropType extends BaseModalPropType {
  can_draggable?: boolean;
}

interface BaseDrawerPropType extends BaseModalPropType {
  direction?: "rtl" | "ltr" | "ttb" | "btt" | "rtl";
  with_header?: boolean;
}

interface DialogType extends BaseDialogPropType {
  type: "dialog"
}

interface DrawerType extends BaseDialogPropType {
  type: "drawer"
}

type MModalPropType = DrawerType | DialogType

interface BaseModalEmitType {
  (e: "dialog_open"): void;
  (e: "dialog_close"): void;
  (e: "update:visible", v: boolean): void;
} 

type MModalInstance = InstanceType<typeof import("./modal.vue")["default"]>;
type MDialogInstance = InstanceType<typeof import("./dialog.vue")["default"]>;
type MDrawerInstance = InstanceType<typeof import("./drawer.vue")["default"]>;

export type {
  MDialogInstance,
  MDrawerInstance,
  BaseDialogPropType,
  BaseDrawerPropType,
  MModalPropType,
  BaseModalEmitType
}
