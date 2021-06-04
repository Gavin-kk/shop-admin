import { IFormValues } from '@pages/user/typing';
import request from './request';
// 获取用户信息列表
export const getUserListRequest = ():Promise<any> => request.get('/auth/userlist');

// 添加用户
export const addUserRequest = (values:IFormValues):Promise<any> => request.post('/auth/register', values);

// 通过id获取用户信息
export const getUserInfoRequest = (id:number):Promise<any> => request.get('/auth/user', {
  params: {
    id,
  },
});

// 通过id 更新用户信息
export const updateUserInfoRequest = (values:IFormValues):Promise<any> => request.post('/auth/update', values);

// 通过id 删除用户
export const deleteUserRequest = (id:number):Promise<any> => request.delete('/auth/user', {
  params: {
    id,
  },
});
// 通过用户名或手机号或email 来搜索用户
export const searchForUsersRequest = (content:string):Promise<any> => request.get('/auth/search', {
  params: {
    content,
  },
});
// 给用户分配角色
export const assigningRolesRequest = (id:number, roleId:number):Promise<any> => request.post('/auth/role', {
  id,
  roleId,
});
