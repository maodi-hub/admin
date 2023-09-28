const ERR_CODE: Record<string, string> = {
  ERR_NETWORK: "网络出错！",
  401: "登录过期！",
};

export function checkCode(code: string) {
  return ERR_CODE[code] || "网络出错！";
}
