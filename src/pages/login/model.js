/*
 * @Author: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-15 18:05:18
 * @Description: 用户登录
 * @FilePath: \Palette-taro\src\pages\login\model.js
 */
import * as userApi from "./service";

export default {
  namespace: "user",
  state: {
    user: null,
    token: null,
    isLogin: true
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
