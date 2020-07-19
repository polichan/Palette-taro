/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-11 19:15:18
 * @LastEditTime: 2020-07-19 15:23:30
 * @LastEditors: 陈鹏宇
 * @Description: API
 * @Version: 1.0
 */ 
import request from "@/utils/request/request";

/**
 * 获取人脸列表
 */
export const getFaceList = params => {
  return request.get("/crmFace/getCategoryFace", params);
};

/**
 * 获取所有人脸分类
 *
 */
export const getFaceCategoryList = params => {
  return request.get("/crmFaceCategory/getAllCrmFaceCategoryList", params);
};

