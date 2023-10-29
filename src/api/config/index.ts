import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { ElMessage } from "element-plus";
import { AxiosCanceler } from "../helper/axiosCancel";
import { checkCode } from "../helper/checkCode";

import { useGlobalStore } from "@/store/modules/global";
import { isFunction } from "lodash";

const axiosCancel = new AxiosCanceler();

const config = {
  timeout: 30000,
  baseURL: import.meta.env.VITE_API,
  // 跨域时候允许携带凭证
  // withCredentials: true,
};

class HttpRequest {
  service: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config) => {
        const { token, language } = useGlobalStore();

        axiosCancel.addPending(config);

        if (isFunction(config.headers.set)) {
          token && config.headers.set("x-token", token);
          language && config.headers.set("Accept-Language", language);
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response;

        axiosCancel.removePending(config);

        return data;
      },
      async (error: AxiosError) => {
        console.log(error, "error");
        const { code } = error;
        ElMessage.error(checkCode(code!));
        return Promise.reject(error);
      }
    );
  }

  send<T>(config: AxiosRequestConfig = {}): Promise<ResultData<T>> {
    return this.service(config);
  }

  get<T>(
    url: string,
    params?: any,
    _object: AxiosRequestConfig = {}
  ): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(
    url: string,
    params?: any,
    _object: AxiosRequestConfig = {}
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(
    url: string,
    params?: any,
    _object: AxiosRequestConfig = {}
  ): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(
    url: string,
    params?: any,
    _object: AxiosRequestConfig = {}
  ): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}

export default new HttpRequest(config);
