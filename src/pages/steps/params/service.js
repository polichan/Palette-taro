import request from '../../utils/request/request';
export const demo = (data) => {
  return request.post('/demo', data)
};
