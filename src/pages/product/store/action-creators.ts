import { IActionType } from '@src/common/types/sotre-types/action-type';
import { ActionType } from '@pages/product/store/constant';
import {
  IDetails, IProduct, ISearch, IUploadDate,
} from '@pages/product/typing';
import { SubmitType } from '../components/details-modification';

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
export const changeGoodsDetailAction = (data:IDetails | null):IActionType => ({
  type: ActionType.CHANGE_GOODS_DETAIL,
  data,
});

// 删除上传的图片
export const deleteUploadedImageAction = (name:string):IActionType => ({
  type: ActionType.DELETE_UPLOAD_IMG,
  data: {
    name,
  },
});

// 更改添加商品页面的级联选择器 当前选择谁
export const changeCurrentSelectedAction = (index:number | null):IActionType => ({
  type: ActionType.CHANGE_CURRENT_CASCADE_SELECTION,
  data: {
    index,
  },
});

// 更改富文本编辑器的内容
export const changeTheContentOfTheRichTextEditorAction = (content:string | null):IActionType => ({
  type: ActionType.CHANGE_RICH_TEXT_EDITOR_CONTENT,
  data: content,
});
// 更改存储的文件上传返回的url数组
export const changeUploadUrlListAction = (list:IUploadDate | null):IActionType => ({
  type: ActionType.CHANGE_UPLOAD_IMG_PATH,
  data: list,
});

// 添加商品
export const addingGoodsAction = (data:SubmitType):IActionType => ({
  type: ActionType.ADD_PRODUCT,
  data,
});
