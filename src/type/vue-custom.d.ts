export {}

declare module "vue" {
  // 自定义选项扩展
  interface ComponentCustomOptions {
  }
  // 自定义属性扩展
  interface ComponentCustomProperties {
    MDialog: typeof import("@/components/global/m_dialog")['MDialog'];
    MDrawer: typeof import("@/components/global/m_drawer")['MDrawer'];
    MTable: typeof import("@/components/global/m_table")['MTable'];
    MIcon: typeof import("@/components/global/m_icon")['MIcon'];
    MEcharts: typeof import('@/components/global/m_echarts')['MEcharts'];
    MCountTo: typeof import('@/components/global/m_count_to')['MCountTo'];
  }
}

declare module 'vue-router' {
  interface RouteMeta extends Menu.MetaProps {
  }
}
