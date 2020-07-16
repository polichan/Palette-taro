/*
 * @Author: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-15 18:05:18
 * @Description: 用户登录
 * @FilePath: \Palette-taro\src\pages\login\model.js
 */
import * as questionApi from "./service";

export default {
  namespace: "question",
  state: {

  },

  effects: {
    *getQuestionById({payload}, { call }) {
      const res = yield call(questionApi.getQuestionById, payload.data)
      return res;
    },
    
    *submitSolution({payload}, {call}){
        const res = yield call(questionApi.submitSolution, payload.data)
        return res
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
