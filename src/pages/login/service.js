import request from '../../utils/request/request';

// eslint-disable-next-line import/prefer-default-export
export const login = (data) => {
  return request.post('/token/', data)
};
