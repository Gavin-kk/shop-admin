import httpRequest from '@src/services/request';
import { AddRoleType } from '@pages/role/components/modal';

export const getRoleListRequest = ():Promise<any> => httpRequest.get('/role/list');

// 添加角色
export const addRoleRequest = (info:AddRoleType):Promise<any> => httpRequest.post('/role/add', info);
