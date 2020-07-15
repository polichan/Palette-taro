/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-15 15:33:04
 * @LastEditors: 陈鹏宇
 * @Description: dva 数据中心
 * @Version: 1.0
 */ 
import Taro from "@tarojs/taro";
import models from "../../models";
import dva from "./dva";

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e) {
    Taro.showToast({
      icon: "none",
      title: e.message
    })
  }
});
const store = dvaApp.getStore();

export default store;
