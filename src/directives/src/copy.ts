import { ElMessage } from "element-plus";

import type { Directive } from "vue";

interface ElType<T = any> extends HTMLElement {
  value: T;
}

type ValueType = string | number | Record<string, unknown>;

const vCopy: Directive<ElType<ValueType>, ValueType> = {
  mounted(el, bind) {
    el.value = bind.value;
    el.addEventListener("click", handleCopy);
  },
  updated(el, bind) {
    el.value = bind.value;
  },
  beforeUnmount(el) {
    el.removeEventListener("click", handleCopy);
  },
};

function handleCopy(this: ElType<ValueType>) {
  const copyValue = this.value.toString();

  const input = document.createElement("input");
  input.value = copyValue;
  document.body.appendChild(input);

  input.select();
  const copyState = document.execCommand("Copy");
  document.body.removeChild(input);

  ElMessage({
    type: copyState ? "success" : "warning",
    message: copyState ? "复制成功" : "复制失败",
  });
}

export default vCopy;
