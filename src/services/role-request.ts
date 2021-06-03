import httpRequest from '@src/services/request';

export const getRoleListRequest = ():Promise<any> => httpRequest.get('/role/list');
