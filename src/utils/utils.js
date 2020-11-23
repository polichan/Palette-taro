import Taro from "@tarojs/taro";
import _isFunction from "lodash/isFunction";
import * as Config from "../config/config";
import * as CONSTANTS from "../constants/index";
import store from "./store/store";

const FILE_BASE_NAME = "local"
/**
 * dispatch
 * @param {*} type
 */
export const createAction = type => payload => ({ type, payload });

/**
 * Base字符串转换为 Binary Src
 * @param {*} base64data Base64字符串
 * @param {*} cb 回调
 */
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
export function getSrc(name, slash = true) {
  if (slash) {
    return Config.BASE_API + '/' + name
  }
  return Config.BASE_API + name
}

/**
 * 获取缓存资源包中的图片文件
 * @param {*} name 
 */
export function getLocalCacheImageSrc(name) {
  const userPath = Taro.env.USER_DATA_PATH
  const n = name.split('/')
  return `${userPath}/${n[n.length - 1]}`
}

/**
 * 获取请求地址
 */
export function getBaseApi() {
  return Config.BASE_API
}

/**
 * 封装后的页面跳转，防止出现页面栈超出最大显示
 * @param   {string}  url  路由地址
 */
export function navigateTo(url) {
  if (Taro.getCurrentPages().length >= 10) {
    Taro.reLaunch({
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

/**
 * 从本地存储中恢复登录信息
 * @param {*} callback 
 */
export function restoreLoginStatus(callback) {
  const token = Taro.getStorageSync(CONSTANTS.STORAGE_TOKEN_KEY)
  const user = Taro.getStorageSync(CONSTANTS.STORAGE_USER_KEY)

  if ((token != '' && token !== null) && (user != '' && user != null)) {
    store.dispatch({
      type: 'user/restoreLoginStatus',
      payload: {
        data: {
          token: token,
          user: user
        }
      }
    }).then(() => {
      if (_isFunction(callback)) {
        callback()
      }
    })
  }
}

/**
 * stepProgressBar 减少
 * @param {*} callback 
 */
export function minusStepProgress(callback) {
  const all = store.getState().step.stepQueue.getAll().length;
  store.dispatch({
    type: "step/minusProgressPercent",
    payload: {
      progressPercent: 100 / all
    }
  }).then(() => {
    callback()
  });
}

/**
 * 重置步骤队列
 * @param {*} callback 重置完成后的回调
 */
export function resetStepsQueue(callback) {
  store
    .dispatch({
      type: "step/resetStep"
    })
    .then(() => {
      store
        .dispatch({
          type: "step/buildStepQueue"
        }).then(() => {
          callback()
        })
    });
}