import Taro from "@tarojs/taro";
import { HTTP_STATUS } from "./config";

const customInterceptor = chain => {
  const requestParams = chain.requestParams;

  return chain.proceed(requestParams).then(res => {
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      Taro.showToast({
        icon: "none",
        title: "请求有误"
      });
    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      Taro.showToast({
        icon: "none",
        title: "服务端错误"
      });
    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      Taro.setStorageSync("Authorization", "");
      // login
      // TODO 根据自身业务修改
      return Promise.reject("没有权限访问");
    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      // 登录操作
      Taro.showToast({
        icon: "none",
        title: "请先登录"
      });
      Taro.setStorageSync("Authorization", "");
      // login
      return Promise.reject("需要鉴权");
    } else if (res.statusCode === HTTP_STATUS.CLIENT_ERROR) {
      Taro.showToast({
        title: "请求错误",
        icon: "none"
      });
    } else if (res.statusCode === HTTP_STATUS.NO_CONTENT) {
      return res.data;
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      return res.data;
    }
  });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
