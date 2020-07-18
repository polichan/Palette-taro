/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-18 19:30:17
 * @LastEditors: 陈鹏宇
 * @Description: 接口
 * @Version: 1.0
 */ 
import request from '@/utils/request/request';

/**
 * step 表单提交
 * @param   {Object}  data  表单
 */
export const submitSteps = (data) => {
    return request.post("/crmFaceRecognitionResult/findCrmFaceRecognitionResultByOptions", data)
}

