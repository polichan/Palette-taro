import Taro from "@tarojs/taro";
import * as stepApi from "./service";

export default {
  namespace: "step",
  state: {
    steps: {}
  },

  effects: {
    *submitSteps({}, { call, select }) {
      const res = yield call(
        stepApi.submitSteps,
        yield select(state => state.steps)
      );
      return res;
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
