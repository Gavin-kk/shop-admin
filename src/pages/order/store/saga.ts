// 第三方
import { put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

// 网络请求 action等等
import { message } from 'antd';
import { IResponse } from '@src/common/types/sotre-types/response';
import { deleteOrderRequest, getOrderListRequest, searchOrderRequest } from '@src/services/order-request';
import { IOrderTable } from '@pages/order/typing';
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { ActionType } from './constant';
import { changeOrderTableListAction, getOrderTableListAction } from './actions-creators';

function* getOrderTableList() {
  try {
    const result:AxiosResponse<IResponse<IOrderTable[]>> = yield getOrderListRequest();
    yield put(changeOrderTableListAction(result.data.data));
  } catch (error:any) {
    yield message.error(error.response.data.msg || error.response.data.message);
  }
}

function* deleteOrder(action:IActionType) {
  const id:number = action.data;
  try {
    yield deleteOrderRequest(id);
    yield put(getOrderTableListAction);
    yield message.success('删除成功');
  } catch (error) {
    yield message.error('删除失败');
    yield message.error(error.response.data.msg || error.response.data.message);
  }
}

function* searchOrder(action:IActionType) {
  const order_number:string = action.data;
  if (!order_number) {
    yield put(getOrderTableListAction);
  } else {
    try {
      const result:AxiosResponse<IResponse<IOrderTable>> = yield searchOrderRequest(order_number);
      yield put(changeOrderTableListAction([result.data.data]));
    } catch (error) {
      yield message.error(error.response.data.msg || error.response.data.message);
    }
  }
}

function* saga(): Generator {
  yield takeEvery(ActionType.GET_ORDER_TABLE_LIST, getOrderTableList);
  yield takeEvery(ActionType.DELETE_ORDER, deleteOrder);
  yield takeEvery(ActionType.SEARCH_ORDER, searchOrder);
}

export default saga;
