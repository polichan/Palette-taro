import Taro from "@tarojs/taro";
import * as stepApi from "./service";

export default {
  namespace: "step",
  state: {
  },

  effects: {
    /**
     * 登录
     * @param {*} param0
     * @param {*} param1
     */
    *login({ payload, onLoginSuccessfully }, { call, put }) {
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
