import request from "../../utils/request/request";

// eslint-disable-next-line import/prefer-default-export
export const getFaceList = params => {
  return request.get("/crm/faces", params);
};
