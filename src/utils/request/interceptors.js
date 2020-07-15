/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-15 15:45:39
 * @LastEditors: 陈鹏宇
 * @Description: 请求结束拦截器
 * @Version: 1.0
 */
import Taro from "@tarojs/taro";

const customInterceptor = chain => {
  const requestParams = chain.requestParams;

  return chain.proceed(requestParams).then(response => {
    if (response.data.code == 0) {
      return response.data
    } else {
      Taro.showToast({
        icon: 'none',
        message: response.data.msg
      })
      if (response.data.data && response.data.data.reload) {
        // todo 退出登录
        store.commit('user/LoginOut')
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
