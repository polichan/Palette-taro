/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-15 14:57:51
 * @LastEditors: 陈鹏宇
 * @Description: 接口
 * @Version: 1.0
 */ 
import request from '../../utils/request/request';

/**
 * 登录
 * @param {*} data 
 */
export const login = (data) => {
  return request.post('/base/login', data)
};

/**
 * 获取验证码
 * @param {*} data 
 */
export const getCaptcha = () => {
  return request.post('/base/captcha')
}

/**
 * JWT 加入黑名单
 */
export const joinInBlockList = () => {
  return request.post("/jwt/jsonInBlacklist")
}