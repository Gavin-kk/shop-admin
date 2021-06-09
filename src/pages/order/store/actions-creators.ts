import { IActionType } from '@src/common/types/sotre-types/action-type';
import { ActionType } from '@pages/order/store/constant';
import { IOrderTable } from '../typing';

export const getOrderTableListAction:IActionType = {
  type: ActionType.GET_ORDER_TABLE_LIST,
};

export const changeOrderTableListAction = (data:IOrderTable[]):IActionType => ({
  type: ActionType.CHANGE_ORDER_TABLE_LIST,
  data,
});

export const deleteOrderAction = (id:number):IActionType => ({
  type: ActionType.DELETE_ORDER,
  data: id,
});

export const searchOrderAction = (order_number:string):IActionType => ({
  type: ActionType.SEARCH_ORDER,
  data: order_number,
});
