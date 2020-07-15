/*
 * @Author: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-15 14:26:37
 * @LastEditors: 陈鹏宇
 * @Description: Request 请求封装
 * @FilePath: \Palette-taro\src\utils\request\request.js
 */ 
import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

class request {

  baseOptions(params, method = "GET") {
    let {url, data} = params;
    const BASE_URL = getBaseUrl(url);
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    let header = {'content_type': contentType};
    const token = Taro.getStorageSync('token');
    const user = Taro.getStorageSync('user')
    if (token) {
      header = Object.assign(header, {'x-token': token, 'x-user-id': user.id})
    }
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header,
    };
    return Taro.request(option);
  }

  get(url, data = "") {
    let option = {url, data};
    return this.baseOptions(option);
  }

  post(url, data, contentType) {
    let params = {url, data, contentType};
    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    let option = {url, data};
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = {url, data};
    return this.baseOptions(option, "DELETE");
  }

}

export default new request()
