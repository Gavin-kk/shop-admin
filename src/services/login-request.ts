import { AxiosResponse } from 'axios';

import { IFormType } from '@pages/login/typing';
import httpRequest from './request';

export const loginRequest = (user:IFormType): Promise<AxiosResponse<any>> => httpRequest.post('/login', {
  username: user.username,
  password: user.password,
});

// httpRequest.get('http://api.map.baidu.com/weather/v1/?district_id=150100&data_type=all&ak=346rOS8b2xRWEbqzFMhKKZDlD7A1V0t9').then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err.message);
// });
