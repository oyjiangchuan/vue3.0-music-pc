import axios from "axios";
import config from "@/utils/config";

function handleError(error: Error) {
  return Promise.reject(error);
}

function handleResponse(response: any) {
  if (response.status === 200) {
    return response;
  }
}

// 通用的axios实例
function createBaseInstance() {
  const instance = axios.create({
    baseURL: config.apiHost
  });

  instance.interceptors.response.use(handleResponse, handleError);
  return instance;
}

// 不带全局loaing的请求实例
export const requestWithoutLoading = createBaseInstance();

// 带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所有要在内部插入loading拦截器的处理逻辑
export const request = createBaseInstance();
// mixinLoading(request.interceptors);
