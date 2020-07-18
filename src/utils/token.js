/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-18 11:37:39
 * @LastEditTime: 2020-07-18 11:37:40
 * @LastEditors: 陈鹏宇
 * @Description: Token 管理
 * @Version: 1.0
 */ 
import Taro from "@tarojs/taro";
import * as CONSTANTS from "../constants/index";

class Token{
    constructor(){ 
        this.token = Taro.getStorageSync(CONSTANTS.STORAGE_TOKEN_KEY)
    }

    get(){
        return this.token
    }

    set(token){
        Taro.setStorageSync(CONSTANTS.STORAGE_TOKEN_KEY, token)
        this.token = token
        return this.token
    }

    has(){
        return this.token !== '' && this.token !== null
    }
}

export default Token