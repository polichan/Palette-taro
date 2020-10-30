import * as introApi from './service';
export default {
  namespace: 'intro',
  state: {
  },
  effects: {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(introApi.demo, {});
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
