import * as faceApi from "./service";

export default {
  namespace: "face",
  state: {
    faceList: []
  },

  effects: {
    /**
     * 登录
     * @param {*} param0
     * @param {*} param1
     */
    *login({ payload }, { call, put }) {
      const res = yield call(faceApi.getFaceList, payload.data);
      if (res.status) {
        yield put({
          type: "save",
          payload: {
            faceList: res.data
          }
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
