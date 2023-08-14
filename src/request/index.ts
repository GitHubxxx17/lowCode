import axios from "axios";
import { ElMessage } from "element-plus";
import { sessionGetData } from "../hooks/useStorage.ts";
import mainStore from "../stores/mainStore.ts";
import pinia from "../stores/index.ts";
const mainData = mainStore(pinia);

const errorFun = () => {
  mainData.isLoading = false;
  mainData.isSucessSave = false;
  mainData.isNeedSave = true;
};
let service = axios.create({
  baseURL: "http://47.115.228.27:8081",
  timeout: 3000,
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    //给需要验证token的接口添加authorization
    if (!config.url.match(/^\/user/)) {
      config.headers.authorization = sessionGetData("token");
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数
    console.log(error);
    const { status } = error.request;
    if (status == 0) {
      ElMessage.error("请检查您的网络配置!");
      errorFun();
    } else if (status == 400) {
      ElMessage.error("400错误,请求语法错误!");
      errorFun();
    } else if (status == 401) {
      ElMessage.error("401错误,请求需要身份验证!");
      errorFun();
    } else if (status == 403) {
      ElMessage.error("403错误,服务器拒绝请求!");
      errorFun();
    } else if (status == 404) {
      ElMessage.error("404错误,请求的资源不存在!");
      errorFun();
    } else if (status == 500) {
      ElMessage.error("500错误,服务器内部错误，无法完成请求!");
      errorFun();
    } else if (status == 502) {
      ElMessage.error("502错误,错误网关,请检查您的网络配置!");
      errorFun();
    } else if (status == 503) {
      ElMessage.error("503错误,服务器暂时无法处理请求!");
      errorFun();
    } else if (status == 504) {
      ElMessage.error("504错误,网关超时,请检查您的网络配置!");
      errorFun();
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
