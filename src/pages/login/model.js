import * as loginApi from "./service";

export default {
  namespace: "login",
  state: {
    userInfo: null,
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
      const res = yield call(loginApi.login, payload.data);
      console.log(res)
      // 设置 token
    //   yield put({
    //     type: "save",
    //     payload: {
    //       userInfo: user,
    //       token: token,
    //       isLogin: true
    //     }
    //   });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
