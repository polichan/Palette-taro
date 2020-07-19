/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-19 16:17:34
 * @LastEditors: 陈鹏宇
 * @Description: face 模型
 * @Version: 1.0
 */
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
    *getFaceList({ payload }, { call, put }) {
      const res = yield call(faceApi.getFaceList, payload.data);
      yield put({
        type: 'saveFace',
        payload: {
          targetIndex: payload.targetIndex,
          list: res.data.list
        }
      })
      return res
    },
    *getFaceCategoryList({ }, { call, put }) {
      const res = yield call(faceApi.getFaceCategoryList)
      const list = res.data.list.map(item => {
        return { title: item.name, id: item.ID, list: [], loading: true }
      })
      yield put({
        type: 'save',
        payload: {
          faceCategoryList: list
        }
      })
      return list
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveFace(state, { payload }) {
      const targetIndex = payload.targetIndex
      let target = state.faceCategoryList[targetIndex]
      target = Object.assign(target, { list: payload.list, loading: false })
      state.faceCategoryList[targetIndex] = target
      return state
    }
  }
};
