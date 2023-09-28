interface Result {
  code: number;
  msg: string;
}

// * 请求响应参数(包含data)
interface ResultData<T = any> extends Result {
  data?: T;
}

namespace Auth {
  interface LoginDTO {
    password: string;
    username: string;
    verifyCode: number;
  }
  interface LoginVO {
    user: {
      id: number;
      createdAt: string;
      updatedAt: string;
      username: string;
      password: string;
      nickName: string;
      roleId: number;
      status: number;
      isPhone: number;
      isBankCard: number;
      deptId: number;
      googleAuthKey: string;
    };
    token: string;
    expiresAt: number;
  }

  interface PermissionDTO {
    id: number;
  }
  interface PermissionVO {
    permissions: string[];
  }
}
