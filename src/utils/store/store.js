/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-15 15:48:54
 * @LastEditors: 陈鹏宇
 * @Description: dva 数据中心
 * @Version: 1.0
 */ 
import Taro from "@tarojs/taro";
import models from "../../models";
import dva from "./dva";
import { createAction } from "../utils";

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    Taro.showToast({
      icon: "none",
      title: e.message
    })
    dispatch(createAction("sys/error")(e));
  }
});
const store = dvaApp.getStore();

export default store;
