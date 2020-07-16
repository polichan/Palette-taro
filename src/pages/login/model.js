/*
 * @Author: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-15 18:05:18
 * @Description: 用户登录
 * @FilePath: \Palette-taro\src\pages\login\model.js
 */
import Taro, { Component } from "@tarojs/taro";
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
      return true;
    },

    *getCaptcha({}, { call }) {
      const res = yield call(userApi.getCaptcha);
      return res;
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
