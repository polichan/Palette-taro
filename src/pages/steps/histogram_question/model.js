/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-19 16:17:34
 * @LastEditors: 陈鹏宇
 * @Description: face 模型
 * @Version: 1.0
 */

export default {
    namespace: "histogram",
    state: {
        chartXData: ["0", "1", "2", "4", "5"],
        chartYData: []
    },

    effects: {
        *saveChartYData({ payload }, { put }) {
            yield put({
                type: 'save',
                payload: {
                    chartYData: payload
                }
            })
            return true
        }
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        }
    }
};
