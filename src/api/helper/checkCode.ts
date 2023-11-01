const ERR_CODE: Record<string, string> = {
  400: "请求失败！请稍后重试",
  401: "登录过期！",
  403: "无权限访问",
  404: "资源不存在",
  408: "请求超时！请您稍后再试",
  500: "服务异常！",
  502: "网关错误！",
  503: "服务不可用！",
  504: "网关超时！",
};

export function checkCode(code?: number) {
  if (!code) return "请求失败！";
  return ERR_CODE[code] || "请求失败！";
}
