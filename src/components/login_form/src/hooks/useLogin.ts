import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

import { useGlobalStore } from "@/store/modules/global";
import { useUserStore } from "@/store/modules/user";
import { useMenuStore } from "@/store/modules/menu";

import { AUTH } from "@/api";
import { ElMessage } from "element-plus";

type ToLoginType = Omit<Auth.LoginDTO, "verifyCode"> & { verifyCode: string };

export function useLogin() {
  const $router = useRouter();
  const $global = useGlobalStore();
  const $user = useUserStore();
  const $menu = useMenuStore();

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
      const res = await toLogin(payload);
      $global.setToken(res.token);
      $user.setUserInfo(res);

      const permission_list = await getPermissionList(
        $user.getUserInfoByKey("roleId")
      );
      $menu.setPermission(permission_list.permissions);

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

async function toLogin(payload: ToLoginType) {
  const param = {
    ...payload,
    verifyCode: +payload.verifyCode,
  };
  const { code, data, msg } = await AUTH.login(param);
  if (!!code) {
    ElMessage.warning(msg);
    throw msg;
  }
  const { token, expiresAt, user } = data!;
  const userInfo = {
    token,
    expiresAt,
    ...user,
  };
  return userInfo;
}

async function getPermissionList(id: number) {
  const param = {
    id,
  };
  const { code, data, msg } = await AUTH.getPermission(param);
  if (!!code) {
    ElMessage.warning(msg);
    throw msg;
  }
  return data!;
}
