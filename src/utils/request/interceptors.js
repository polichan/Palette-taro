/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-18 23:21:34
 * @LastEditors: 陈鹏宇
 * @Description: 请求结束拦截器
 * @Version: 1.0
 */
import Taro from "@tarojs/taro";
import logOut from "@/utils/logout";

const customInterceptor = chain => {
  const requestParams = chain.requestParams;

  return chain.proceed(requestParams).then(response => {
    if (response.statusCode == 404) {
      Taro.showToast({
        title: '404',
        icon: 'none'
      })
      return Promise.reject(response.data.msg)
    }
    if (response.data.code == 0) {
      return response.data
    } else {
      Taro.showToast({
        icon: 'none',
        message: response.data.msg,
        duration: 2000
      })
      if (response.data.data && response.data.data.reload) {
        logOut()
      }
      return Promise.reject(response.data.msg)
    }
  });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
