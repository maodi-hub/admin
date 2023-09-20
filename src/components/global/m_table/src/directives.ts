import { isFunction } from "@/utils/is";
import type { Directive } from "vue";

interface ELementType extends HTMLDivElement{
  loadMore?: () => void
}

export const vBottomLoading: Directive<ELementType, (() => void) | undefined> =(function() {

  function onReachTheBottom (this: ELementType) {
    if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
      this.loadMore && this.loadMore();//执行操作
    }
  }

  return {
    mounted(el, binding) {
      if (!binding.value || !isFunction(binding.value)) return;

      const selectWrap = el.querySelector('.el-table__body-wrapper>.el-scrollbar>.el-scrollbar__wrap') as ELementType;
      if (!selectWrap) return;

      selectWrap.loadMore = binding.value;
      selectWrap.addEventListener('scroll',onReachTheBottom)
    },
    beforeUnmount(el) {
      const selectWrap = el.querySelector('.el-table__body-wrapper>.el-scrollbar>.el-scrollbar__wrap') as ELementType;
      if (!selectWrap) return;
      selectWrap.removeEventListener('scroll',onReachTheBottom)
    },
    updated(el, binding) {
      if (!binding.value || !isFunction(binding.value)) return;

      const selectWrap = el.querySelector('.el-table__body-wrapper>.el-scrollbar>.el-scrollbar__wrap') as ELementType;
      if (!selectWrap) return;

      selectWrap.loadMore = binding.value;
    }
  }
})() 