import Taro from "@tarojs/taro";
import * as Config from "../config/config";
import * as CONSTANTS from "../constants/index";
import store from "./store/store";
import _isFunction from "lodash/isFunction";

const FILE_BASE_NAME = "local"
/**
 * dispatch
 * @param {*} type
 */
export const createAction = type => payload => ({ type, payload });

export function base64src(base64data, cb) {
  const [, format, bodyData] =
    /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
  if (!format) {
    return new Error("ERROR_BASE64SRC_PARSE");
  }
  const filePath = `${Taro.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
  const buffer = Taro.base64ToArrayBuffer(bodyData);
  const fsm = Taro.getFileSystemManager();
  fsm.writeFile({
    filePath,
    data: buffer,
    encoding: "binary",
    success() {
      cb(filePath);
    },
    fail() {
      return new Error("ERROR_BASE64SRC_WRITE");
    }
  });
}

/**
 * 获取资源路径
 *
 * @param   {string}  name  资源名称
 *
 * @return  {string}  资源地址
 */
export function getSrc(name, slash = true){
  if(slash){
    return Config.BASE_API + '/' + name
  }
  return Config.BASE_API + name
}

/**
 * 获取请求地址
 */
export function getBaseApi(){
  return Config.BASE_API
}

/**
 * 封装后的页面跳转，防止出现页面栈超出最大显示
 * @param   {string}  url  路由地址
 */
export function navigateTo(url) {
  console.log(Taro.getCurrentPages())
  if (Taro.getCurrentPages().length >= 10) {
    Taro.redirectTo({
      url: url,
      success: function () { },
      fail: function () { },
      complete: function () { },
    })
  } else {
    Taro.navigateTo({
      url: url,
    })
  }
}


export function restoreLoginStatus(callback){
  const token = Taro.getStorageSync(CONSTANTS.STORAGE_TOKEN_KEY)
  const user = Taro.getStorageSync(CONSTANTS.STORAGE_USER_KEY)

  if((token != ''  && token !== null) && (user != '' && user != null)){
    store.dispatch({
      type: 'user/restoreLoginStatus',
      payload:{
        data:{
          token: token,
          user: user
        }
      }
    }).then(()=>{
      if(_isFunction(callback)){
        callback()
      }
    })
  }
}