import request from "@/utils/request/request";

/**
 * 获取人脸列表
 */
export const getFaceList = params => {
  return request.get("/crmFace/getCrmFaceList", params);
};

/**
 * 获取所有人脸分类
 *
 */
export const getFaceCategoryList = params => {
  return request.get("/crmFaceCategory/getAllCrmFaceCategoryList", params);
};
