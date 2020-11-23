/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-18 22:53:13
 * @LastTime: 2020-11-23 22:19:39
 * @LastAuthor: 陈鹏宇
 * @Description: 一键退出登录
 * @Version: 1.0
 */

import store from "@/utils/store/store";
import Taro from "@tarojs/taro";
import * as CONSTANTS from "../constants/index";
import { resetStepsQueue } from "./utils"
/**
 * 重新登录
 */
const logOut = (authorizationExpired = false) => {
   if (authorizationExpired) {
      store.dispatch({
         type: 'user/logOut'
      }).then(() => {
         resetStepsQueue(() => {
            redirectToIndex()
         })
      })
   } else {
      const token = Taro.getStorageSync(CONSTANTS.STORAGE_TOKEN_KEY)
      if (token != '' && token != null) {
         store.dispatch({
            type: 'user/joinInBlackList'
         }).then(res => {
            if (res.code == 0) {
               store.dispatch({
                  type: 'user/logOut'
               }).then(() => {
                  resetStepsQueue(() => {
                     redirectToIndex()
                  })
               })
            }
         })
      } else {
         resetStepsQueue(() => {
            redirectToIndex()
         })
      }
   }
}

/**
 * 返回首页
 */
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