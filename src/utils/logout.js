/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-18 22:53:13
 * @LastEditTime: 2020-07-19 10:22:31
 * @LastEditors: 陈鹏宇
 * @Description: 请修改此处文件描述
 * @Version: 1.0
 */

import store from "@/utils/store/store";
import Taro from "@tarojs/taro";
import * as CONSTANTS from "../constants/index";
/**
 * 重新登录
 */
const logOut = () => {
   const token = Taro.getStorageSync(CONSTANTS.STORAGE_TOKEN_KEY)
   if (token != '' && token != null) {
      store.dispatch({
         type: 'user/joinInBlackList'
      }).then(res => {
         console.log(res)
         if (res.code == 0) {
            store.dispatch({
               type: 'user/logOut'
            }).then(() => {
               store.dispatch({
                  type: 'step/setStepQueueToRebuild',
               }).then(() => {
                  redirectToIndex()
               })
            })
         }
      })
   } else {
      store.dispatch({
         type: 'step/setStepQueueToRebuild',
      }).then(() => {
         redirectToIndex()
      })
   }
}

const redirectToIndex = () => {
   const indexPagePath = '/pages/index/index'
   const pages = Taro.getCurrentPages()
   const lastPage = pages[pages.length - 1]
   if (lastPage.route != indexPagePath) {
      // 已经在首页了
      Taro.redirectTo({
         url: indexPagePath
      })
   }
}

export default logOut