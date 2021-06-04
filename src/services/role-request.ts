import httpRequest from '@src/services/request';
import { RoleType } from '@pages/role/typing';

export const getRoleListRequest = ():Promise<any> => httpRequest.get('/role/list');

// 添加角色
export const addRoleRequest = (info:RoleType):Promise<any> => httpRequest.post('/role/add', info);

// 更新角色信息
export const editRoleRequest = (info:RoleType):Promise<any> => httpRequest.post('/role/update', info);

// 删除角色
export const deleteRoleRequest = (id:number):Promise<any> => httpRequest.delete('/role/delete', {
  params: {
    id,
  },
});

// 搜索角色
export const searchRoleRequest = (content:string):Promise<any> => httpRequest.get('/role/search', {
  params: {
    content,
  },
});
