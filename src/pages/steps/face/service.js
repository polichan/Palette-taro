import request from "@/utils/request/request";

/**
 * 获取人脸列表
 */
export const getFaceList = params => {
  return request.get("/crmFace/getCrmFaceList", params);
};
