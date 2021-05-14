import { AxiosResponse } from 'axios';

import { IFormType } from '@pages/login/typing';
import httpRequest from './request';

export const loginRequest = (user:IFormType): Promise<AxiosResponse<any>> => httpRequest.post('/login', {
  username: user.username,
  password: user.password,
});
