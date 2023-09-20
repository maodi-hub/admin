import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

import { useGlobalStore } from "@/store/modules/global";


export function useLogin() {

  const $router = useRouter();
  const $global = useGlobalStore();

  const login_loading = ref(false);
  const form = reactive({
    account: "",
    password: ""
  })
  
  const handleLogin = async (payload: typeof form, validateFn?: (...arg: any) => PromiseLike<boolean>) => {
    if (validateFn) {
      const valid = await validateFn();
      if (!valid) return; 
    } 
    login_loading.value = true;
    $global.setToken("hahahsahas");
    setTimeout(() => {
      login_loading.value = false;
      $router.push("/home");
    }, 4000);

  };

  return {
    form,
    login_loading,
    handleLogin
  }
}