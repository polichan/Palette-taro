import Taro from "@tarojs/taro";
import * as loginApi from "./service";

export default {
  namespace: "login",
  state: {
    token: null,
    refresh: null,
    isLogin: false
  },

  effects: {
    /**
     * 登录
     * @param {*} param0
     * @param {*} param1
     */
    *login({ payload, onLoginSuccessfully }, { call, put }) {
      const res = yield call(loginApi.login, payload.data);
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
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
