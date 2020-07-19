/*
 * @Author: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-19 10:16:39
 * @Description: 用户登录
 * @FilePath: \Palette-taro\src\pages\login\model.js
 */
import Taro from "@tarojs/taro";
import * as userApi from "./service";
import * as CONSTANTS from "../../constants/index"

export default {
  namespace: "user",
  state: {
    user: null,
    token: null,
    isLogin: false
  },

  effects: {
    /**
     * 登录
     * @param {*} param0
     * @param {*} param1
     */
    *login({ payload }, { call, put }) {
      const res = yield call(userApi.login, payload.data);
      yield put({
        type: "save",
        payload: {
          token: res.data.token,
          user: res.data.user,
          isLogin: true
        }
      });
      Taro.setStorageSync(CONSTANTS.STORAGE_TOKEN_KEY, res.data.token)
      Taro.setStorageSync(CONSTANTS.STORAGE_USER_KEY, res.data.user)
      return true;
    },

    *getCaptcha({}, { call }) {
      const res = yield call(userApi.getCaptcha);
      return res;
    },

    *joinInBlackList({}, {call}){
      const res = yield call(userApi.joinInBlockList)
      return res
    },

    *logOut({}, {put}){
      yield put({
        type: 'save',
        payload:{
          user: null,
          token: null,
          isLogin: false
        }
      })
      Taro.clearStorageSync()
    },

    *restoreLoginStatus({payload}, {put}){
      yield put({
        type: 'save',
        payload:{
          user: payload.data.user,
          token: payload.data.token,
          isLogin: true
        }
      })
      return true
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
