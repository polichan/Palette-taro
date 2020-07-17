import Taro from "@tarojs/taro";
import * as Config from "../config/config"

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