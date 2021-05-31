import { IActionType } from '@src/common/types/sotre-types/action-type';
import { ActionType } from '@pages/product/store/constant';
import { IDetails, IProduct, ISearch } from '@pages/product/typing';

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
export const changeSearchListAction = (list:ISearch[]):IActionType => ({
  type: ActionType.CHANGE_SEARCH_LIST,
  data: list,
});

// 获取商品详情
export const getGoodsDetailAction = (id:number):IActionType => ({
  type: ActionType.GET_GOODS_DETAIL,
  data: { id },
});
// 更改reducer中的数据
export const changeGoodsDetailAction = (data:IDetails):IActionType => ({
  type: ActionType.CHANGE_GOODS_DETAIL,
  data,
});

// 更改添加商品页面的级联选择器 当前选择谁
export const changeCurrentSelectedAction = (index:number):IActionType => ({
  type: ActionType.CHANGE_CURRENT_CASCADE_SELECTION,
  data: {
    index,
  },
});
