/*
 * @Author: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-15 15:03:29
 * @Description: 用户登录
 * @FilePath: \Palette-taro\src\pages\login\model.js
 */ 
import Taro from "@tarojs/taro";
import * as userApi from "./service";

export default {
  namespace: "user",
  state: {
    token: null,
    refresh: null,
    isLogin: false,
  },

  effects: {
    /**
     * 登录
     * @param {*} param0
     * @param {*} param1
     */
    *login({ payload, onLoginSuccessfully }, { call, put }) {
      const res = yield call(userApi.login, payload.data);
      if (res.status) {
        yield put({
          type: "save",
          payload: {
            token: res.data.access,
            refresh: res.data.refresh,
            isLogin: true
          }
        });
        onLoginSuccessfully();
      } else {
        Taro.showToast({
          title: "学号或密码不正确",
          icon: "none"
        });
      }
    },
    
    *getCaptcha({_}, {call,put}){
      const res = yield call(userApi.getCaptcha)
      return res
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
