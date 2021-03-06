/*
 * @Author: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-18 23:24:25
 * @LastEditors: 陈鹏宇
 * @Description: Request 请求封装
 * @FilePath: \Palette-taro\src\utils\request\request.js
 */ 
import Taro from '@tarojs/taro'
import * as Utils from "../utils"
import interceptors from './interceptors'
import * as CONSTANTS from "../../constants/index"

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

class request {

  baseOptions(params, method = "GET") {
    let {url, data} = params;
    const BASE_URL = Utils.getBaseApi();
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    let header = {'content_type': contentType};
    const token = Taro.getStorageSync(CONSTANTS.STORAGE_TOKEN_KEY);
    const user = Taro.getStorageSync(CONSTANTS.STORAGE_USER_KEY)
    if (token && user) {
      header = Object.assign(header, {'x-token': token, 'x-user-id': user.ID})
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
