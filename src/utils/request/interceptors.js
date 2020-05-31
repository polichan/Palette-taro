import Taro from "@tarojs/taro";

const customInterceptor = chain => {
  const requestParams = chain.requestParams;

  return chain.proceed(requestParams).then(res => {
    const resultBody = res.data;
    if (resultBody.code === 401) {
      if (
        resultBody.message ==
        "No active account found with the given credentials"
      ) {
        return resultBody
      } else {
        Taro.showToast({
          title: "您已退出",
          icon: "none"
        });
      }
    } else if (resultBody.code >= 400) {
      Taro.showToast({
        title: "请求有误",
        icon: "none"
      });
    } else {
      return resultBody;
    }
  });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
