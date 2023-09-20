import type { Ref } from "vue";

import { unref, nextTick, onScopeDispose, shallowRef, watch } from "vue";

import { useResizeObserver } from "@vueuse/core";

import debounce from "lodash/debounce";

import * as echarts from "echarts/core";

import {
  BarChart,
  LineChart,
  LineSeriesOption,
  PieChart,
  PieSeriesOption,
} from "echarts/charts";
import {
  LegendComponent,
  LegendComponentOption,
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  ToolboxComponent,
} from "echarts/components";

import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | LineSeriesOption
  | PieSeriesOption
  | LegendComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export function useEcharts(
  el: Ref<HTMLDivElement | undefined>,
  baseOpt?: ECOption
) {
  let echartsInstance: echarts.ECharts | undefined;
  let options = shallowRef<ECOption>();

  const resize_observe = useResizeObserver(el, () => onResize());

  const init = (opt?: ECOption) => {
    if (!unref(el)) return;
    echartsInstance = echarts.init(unref(el)!);

    if (opt) {
      handleSetOption(opt);
      return;
    }

    if (baseOpt) handleSetOption(baseOpt);
  };

  const handleSetOption = (opt: ECOption) => {
    nextTick(() => {
      echartsInstance?.setOption(opt);
    });
  };

  const onResize = debounce(() => {
    echartsInstance?.resize({
      animation: {
        duration: 300,
        easing: "linear",
      },
    });
  }, 500);

  onScopeDispose(() => {
    resize_observe.stop();
    echartsInstance?.dispose();
  });

  watch(options, (v) => {
    v && handleSetOption(v);
  });

  return {
    init,
    handleSetOption,
    options,
  };
}
