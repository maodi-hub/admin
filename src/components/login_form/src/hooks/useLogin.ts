import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

import { useGlobalStore } from "@/store/modules/global";

type ToLoginType = Omit<Auth.LoginDTO, "verifyCode"> & { verifyCode: string };

export function useLogin() {
  const $router = useRouter();
  const $global = useGlobalStore();

  const login_loading = ref(false);
  const form = reactive<ToLoginType>({
    username: "",
    password: "",
    verifyCode: "",
  });

  const handleLogin = async (
    payload: ToLoginType,
    validateFn?: (...arg: any) => PromiseLike<boolean>
  ) => {
    if (validateFn) {
      const valid = await validateFn();
      if (!valid) return;
    }
    login_loading.value = true;
    try {
      $global.setToken('12332');

      $router.push("/home");
    } finally {
      login_loading.value = false;
    }
  };

  return {
    form,
    login_loading,
    handleLogin,
  };
}
