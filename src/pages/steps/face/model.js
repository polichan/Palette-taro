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
    *getFaceList({payload}, { call, put }) {
      const res = yield call(faceApi.getFaceList, payload.data);
      yield put({
        type:'save',
        payload:{
          faceList: res.data
        }
      })
      return res
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
