import * as paramsApi from './service';
export default {
  namespace: 'params',
  state: {
  },
  effects: {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(paramsApi.demo, {});
      if (status === 'ok') {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
