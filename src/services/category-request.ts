import { AxiosResponse } from 'axios';
import request from './request';
// 请求父分类列表
export const categoryListRequest = (): Promise<AxiosResponse<any>> => request.get('/classify/parent');

// 添加分类 parentId 如果不传就是一级分类
export function addClassifyRequest(categoryName:string, parentId?:number):Promise<AxiosResponse<any>> {
  return request.post('/classify/add', {
    parentId,
    categoryName,
  });
}

// 更新分类
export function updateClassifyRequest(categoryName:string, parentId:number):Promise<AxiosResponse<any>> {
  return request.put('/classify/update', {
    parentId,
    categoryName,
  });
}

// 删除分类
export function deleteClassifyRequest(id:number):Promise<AxiosResponse<any>> {
  return request.delete('/classify/delete', {
    params: {
      id,
    },
  });
}

// 通过父级id获取子分类列表
export function getClassifyChildRequest(id:number):Promise<AxiosResponse<any>> {
  return request.get('/classify/child', {
    params: {
      id,
    },
  });
}
