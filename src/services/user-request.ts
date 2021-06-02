import { IFormValues } from '@pages/user/typing';
import request from './request';
// 获取用户信息列表
export const getUserListRequest = ():Promise<any> => request.get('/auth/userlist');

// 添加用户
export const addUserRequest = (values:IFormValues):Promise<any> => request.post('/auth/register', values);
