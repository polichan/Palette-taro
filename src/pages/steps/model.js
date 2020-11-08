import Taro from "@tarojs/taro";
import Step from "@/utils/steps/step";
import StepQueue from "@/utils/steps/stepsQueue";
import moment from "moment";
import { DEFAULT_TIME_FORMAT } from "@/constants";
import * as stepApi from "./service";

let s = new StepQueue();
s.add(
  new Step({
    navigationTitle: "实验流程图",
    buttonTitle: "下一步",
    pagePath: "/pages/steps/workflow/index"
  })
);

export default {
  namespace: "step",
  state: {
    params: {
      patchSize: null,
      blockSize: null,
      kSize: null
    },
    progressPercent: 0,
    stepQueue: s,
    hasBuiltStepQueue: false,
    userExperiment: {
      log: null,
    }
  },

  effects: {
    *getExperimentResult({ }, { call, select }) {
      try {
        const params = yield select(state => state.step.params)
        const res = yield call(
          stepApi.getExperimentResult,
          params
        );
        return res;
      } catch (error) {
        Taro.showToast({
          icon: 'none',
          title: '暂无符合条件结果'
        })
        return false
      }
    },

    *saveExperimentLog({ payload }, { call }) {
      yield call(stepApi.createUsersExperiments, payload.params)
    },

    *endExperiment({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          userExperiment: payload.userExperiment
        }
      })
    },

    *startExperiment({ }, { put, select }) {
      const ue = yield select(state => state.step.userExperiment)
      yield put({
        type: 'save',
        payload: {
          userExperiment: Object.assign({
            createdAt: moment().format(DEFAULT_TIME_FORMAT)
          }, ue)
        }
      })
    },

    *resetStepProgressCount({ }, { put }) {
      yield put({
        type: 'save',
        payload: {
          progressPercent: 0
        }
      })
      return true
    },


    *resetStep({ }, { put }) {
      yield put({
        type: 'save',
        payload: {
          progressPercent: 0,
          stepQueue: s.clearAll(),
          hasBuiltStepQueue: false
        }
      })
    },

    *setStepQueueToRebuild({ }, { put }) {
      yield put({
        type: 'save',
        payload: {
          hasBuiltStepQueue: false
        }
      })
      return true
    },

    *saveParams({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          params: payload
        }
      })
      return true
    },

    *addProgressPercent({ payload }, { select, put }) {
      const orig = yield select(state => state.step.progressPercent)
      yield put({
        type: 'save',
        payload: {
          progressPercent: orig + payload.progressPercent
        }
      })
      return true
    },

    *minusProgressPercent({ payload }, { select, put }) {
      const orig = yield select(state => state.step.progressPercent)
      yield put({
        type: 'save',
        payload: {
          progressPercent: orig - payload.progressPercent
        }
      })
      return true
    },

    *buildStepQueue({ }, { put }) {
      let sQueue = new StepQueue();
      sQueue.add(
        new Step({
          navigationTitle: "实验流程图",
          buttonTitle: "下一步",
          pagePath: "/pages/steps/workflow/index"
        })
      );
      sQueue.add(
        new Step({
          navigationTitle: "数据集的作用",
          buttonTitle: "下一步",
          pagePath: "/pages/steps/intro/index"
        })
      );
      sQueue.add(
        new Step({
          navigationTitle: "数据集可视化",
          buttonTitle: "下一步",
          pagePath: "/pages/steps/face/index"
        })
      );

      sQueue.add(
        new Step({
          navigationTitle: "取 Patch 作用",
          buttonTitle: "下一步",
          pagePath: "/pages/steps/patch/index"
        })
      );

      sQueue.add(
        new Step({
          navigationTitle: "特征向量和特征值",
          buttonTitle: "下一步",
          pagePath: "/pages/steps/characteristic/index"
        })
      );

      sQueue.add(
        new Step({
          navigationTitle: "什么是卷积",
          buttonTitle: "下一步",
          pagePath: "/pages/steps/convolution/index"
        })
      );

      sQueue.add(
        new Step({
          navigationTitle: "卷积可视化",
          buttonTitle: "下一步",
          pagePath: "/pages/steps/convolution_visual/index"
        })
      );

      sQueue.add(
        new Step({
          navigationTitle: "二转十可视化",
          buttonTitle: "下一步",
          pagePath: "/pages/steps/binarization/index"
        })
      );

      sQueue.add(
        new Step({
          navigationTitle: "直方图可视化",
          buttonTitle: "下一步",
          pagePath: "/pages/steps/histogram/index"
        })
      );

      sQueue.add(
        new Step({
          navigationTitle: "KNN介绍",
          buttonTitle: "下一步",
          pagePath: "/pages/steps/knn/index"
        })
      );

      sQueue.add(
        new Step({
          navigationTitle: "选择参数",
          buttonTitle: "提交参数",
          pagePath: "/pages/steps/params/index"
        })
      );

      sQueue.add(
        new Step({
          navigationTitle: "测试结果",
          buttonTitle: "下一步",
          pagePath: "/pages/steps/result/index"
        })
      );

      sQueue.add(
        new Step({
          navigationTitle: "直方图的绘制",
          buttonTitle: "提交解答",
          pagePath: "/pages/steps/binarization_question/index"
        })
      );

      sQueue.add(
        new Step({
          navigationTitle: "二进制转十进制",
          buttonTitle: "提交解答",
          pagePath: "/pages/steps/binarization_question/index"
        })
      );

      sQueue.add(
        new Step({
          navigationTitle: "致谢",
          buttonTitle: "返回首页",
          pagePath: "/pages/thanks/index"
        })
      );

      yield put({
        type: 'save',
        payload: {
          stepQueue: sQueue,
          hasBuiltStepQueue: true
        }
      })
      return sQueue
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveUserExperiment(state, { payload }) {
      state.userExperiment = Object.assign(payload.userExperiment, state.userExperiment)
      return state
    }
  }
};
