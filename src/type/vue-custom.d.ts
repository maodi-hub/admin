export {};

declare module "vue" {
  // 自定义选项扩展
  interface ComponentCustomOptions {}
  // 自定义属性扩展
  interface ComponentCustomProperties {
    MDialog: typeof import("@/components/global/m_modal")["MDialog"];
    MDrawer: typeof import("@/components/global/m_modal")["MDrawer"];
    MModal: typeof import("@/components/global/m_modal")["MModal"];
    MTips: typeof import("@/components/global/m_tips")["MTips"];
    MTable: typeof import("@/components/global/m_table")["MTable"];
    MIcon: typeof import("@/components/global/m_icon")["MIcon"];
    MEcharts: typeof import("@/components/global/m_echarts")["MEcharts"];
    MCountTo: typeof import("@/components/global/m_count_to")["MCountTo"];
    MForm: typeof import("@/components/global/m_form")["MForm"];
    MFormItem: typeof import("@/components/global/m_form")["MFormItem"];
    MInput: typeof import("@/components/global/m_input")["MInput"];
    MSelect: typeof import("@/components/global/m_select")["MSelect"];
    MRadio: typeof import("@/components/global/m_radio")["MRadio"];
    MCheckbox: typeof import("@/components/global/m_checkbox")["MCheckbox"];
    MTextArea: typeof import("@/components/global/m_textarea")["MTextArea"];
    MPagination: typeof import("@/components/global/m_pagination")["MPagiantion"];
  }
}

declare module "vue-router" {
  interface RouteMeta extends Menu.MetaProps {}
}
