/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-15 14:57:51
 * @LastEditors: 陈鹏宇
 * @Description: 接口
 * @Version: 1.0
 */

import request from "@/utils/request/request";

/**
 * 获取题目
 * @param   {object}  data  参数
 */
export const getQuestionById = data => {
  return request.get(`/crmProblems/findCrmProblems`, data);
};

/**
 * 提交答案
 * @param   {object}  data  参数
 */
export const submitSolution = data => {
  return request.post("", data);
};
