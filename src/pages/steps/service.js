/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-18 22:41:24
 * @LastEditors: 陈鹏宇
 * @Description: 接口
 * @Version: 1.0
 */ 
import request from '@/utils/request/request';

/**
 * step 表单提交获取实验结果
 * @param   {Object}  data  表单
 */
export const getExperimentResult = (data) => {
    return request.get("/crmFaceRecognitionResult/findCrmFaceRecognitionResultByOptions", data)
}

/**
 * 记录实验
 * @param {Object} data 
 */
export const createUsersExperiments = (data) => {
    return request.post("/crmUsersExperiments/createCrmUsersExperiments", data)
}
