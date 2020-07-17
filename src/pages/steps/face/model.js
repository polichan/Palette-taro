import * as faceApi from "./service";

export default {
  namespace: "face",
  state: {
    faceList: [],
    faceCategoryList: []
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
    },
    *getFaceCategoryList({}, {call, put}){
      const res = yield call(faceApi.getFaceCategoryList)
      const list = res.data.List.map(item=>{
        return {title: item.name, id: item.ID}
      })
      yield put({
        type: 'save',
        payload:{
          faceCategoryList: list
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
