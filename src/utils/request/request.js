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
    if (token) {
      header = Object.assign(header, {'Authorization': token})
    }
    console.log(BASE_URL)
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
