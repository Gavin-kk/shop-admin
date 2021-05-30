import { IActionType } from '@src/common/types/sotre-types/action-type';
import { ActionType } from '@pages/product/store/constant';
import { IProduct } from '@pages/product/typing';

//
export const getProductListAction:IActionType = {
  type: ActionType.GET_PRODUCT_LIST,
};

export const changeProductListAction = (list:IProduct[]):IActionType => ({
  type: ActionType.CHANGE_PRODUCT_LIST,
  data: list,
});

// 发送下架请求
export const offShelfAction = (id:number):IActionType => ({
  type: ActionType.SEND_OFF_SHELF,
  data: { id },
});
// 发送上架请求
export const sendNowOnShelfAction = (id:number):IActionType => ({
  type: ActionType.SEND_NOW_ON_SHELF,
  data: { id },
});

// 获取搜索数据
export const getSearchListAction = (pageNum:number, pageSize:number, content:string):IActionType => ({
  type: ActionType.GET_SEARCH_LIST,
  data: {
    pageNum, pageSize, content,
  },
});
// 更改reducer 中的searchList
export const changeSearchListAction = (list:any):IActionType => ({
  type: ActionType.CHANGE_SEARCH_LIST,
  data: list,
});
