import { AxiosResponse } from 'axios';
import { SubmitType } from '@pages/product/components/details-modification';
import request from './request';
// 查询所有商品的数据和商品所属的分类
export function getProductRequest(): Promise<AxiosResponse<any>> {
  return request.get('/commodity/goods');
}

// 上架商品 下架商品
export function changeProductStatusRequest(productId:number, status:string):Promise<AxiosResponse<any>> {
  return request.put('/commodity/update/status', {
    productId,
    status,
  });
}

// 搜索商品接口

export function searchProductsRequest(pageNum:number, pageSize:number, content:string):Promise<AxiosResponse<any>> {
  return request.get('/commodity/search', {
    params: {
      pageNum,
      pageSize,
      content,
    },
  });
}

// 获取商品详情
export function getGoodsDetailRequest(id:number):Promise<AxiosResponse<any>> {
  return request.get('/commodity/detail', {
    params: {
      id,
    },
  });
}

// 获取所有父分类数据
export function getParentCategoryRequest():Promise<AxiosResponse<any>> {
  return request.get('/classify/list');
}
// 获取所有分类数据
export function getCategoryRequest(id:number):Promise<AxiosResponse<any>> {
  return request.get('/classify/child', {
    params: {
      id,
    },
  });
}

// 删除图片
export function deletePictureRequest(name:string):Promise<AxiosResponse<any>> {
  return request.delete('/upload/delete', {
    params: {
      name,
    },
  });
}
// 添加商品
export function addingGoodsRequest(submit:SubmitType):Promise<AxiosResponse<any>> {
  return request.post('/commodity/add', submit);
}
// 更新商品
export function updateProductRequest(submit:SubmitType):Promise<AxiosResponse<any>> {
  return request.put('/commodity/update', submit);
}
