import { create } from "dva-core";
import { createLogger } from "redux-logger";
import createLoading from "dva-loading";
import { persistReducer, persistStore } from 'redux-persist'
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import Taro from "@tarojs/taro";

let app;
let store;
let dispatch;

// redux 数据持久化
const persistConfig = {
  key: "root",
  storage: {
    getItem(key) {
      return new Promise(resolve => resolve(Taro.getStorageAsync(key)));
    },
    setItem(key, args) {
      return Taro.setStorage({
        key,
        data: args
      });
    },
    removeItem(key) {
      return Taro.removeStorage({
        key
      });
    }
  },
  keyPrefix: "cache-",
  debug: false,
  blacklist: ["dva", "@@dva"],
  stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};

const persistEnhancer = () => createStore => (
  reducer,
  initialState,
  enhancer
) => {
  const createdStore = createStore(
    persistReducer(persistConfig, reducer),
    initialState,
    enhancer
  );
  const persist = persistStore(createdStore, null);
  return { ...createdStore, persist };
};

function createApp(opt) {
  // 加载持久化
  opt.extraEnhancers = [persistEnhancer()];
  // redux日志
  if(process.env != 'producation'){
    // opt.onAction = [createLogger()];
  }
  app = create(opt);

  // 全局 loading
  app.use(createLoading({}));

  // 注册 model
  if (!global.registered) opt.models.forEach(model => app.model(model));
  global.registered = true;
  app.start();

  app.extraEnhancers = [persistEnhancer()];

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  }
};
