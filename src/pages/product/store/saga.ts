import {
  ForkEffect, put, takeEvery,
} from 'redux-saga/effects';
import { ActionType } from '@pages/product/store/constant';
import { AxiosResponse } from 'axios';
import { getProductRequest, changeProductStatus, searchProducts } from '@src/services/product-request';
import { IResponse } from '@src/common/types/sotre-types/response';
import { message } from 'antd';
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { AVAILABLE, TAKE_THE_PRODUCT_OFF_THE_SHELF } from '@src/common/constant/product-constant';
import { IProduct } from '../typing';
import { changeProductListAction, changeSearchListAction, getProductListAction } from './action-creators';

//
function* getProductList() {
  try {
    const result:AxiosResponse<IResponse<IProduct[]>> = yield getProductRequest();
    yield put(changeProductListAction(result.data.data));
  } catch (error) {
    message.error(error.response.data.msg || error.response.data.message);
  }
}

// 发送上架请求
function* sendNowOnShelf(action:IActionType) {
  const { id } = action.data;
  try {
    yield changeProductStatus(id, AVAILABLE);
    yield put(getProductListAction);
    message.success('上架成功');
  } catch (error) {
    yield message.error(error.response.data.message || error.response.data.msg);
  }
}

// 发送下架请求
function* offShelf(action:IActionType) {
  const { id } = action.data;
  try {
    yield changeProductStatus(id, TAKE_THE_PRODUCT_OFF_THE_SHELF);
    yield put(getProductListAction);
    message.success('下架成功');
  } catch (error) {
    yield message.error(error.response.data.message || error.response.data.msg);
  }
}

// 获取搜索的数据
function* getSearch(action:IActionType) {
  const { pageNum, pageSize, content } = action.data;
  try {
    const reslut:AxiosResponse<IResponse<any>> = yield searchProducts(pageNum, pageSize, content);
    yield put(changeSearchListAction(reslut.data.data));
    // console.log(JSON.stringify(reslut.data.data));
  } catch (error) {
    console.log(error.response.data.message || error.response.data.msg);
  }
}
function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.GET_PRODUCT_LIST, getProductList);
  yield takeEvery(ActionType.SEND_NOW_ON_SHELF, sendNowOnShelf);
  yield takeEvery(ActionType.SEND_OFF_SHELF, offShelf);
  yield takeEvery(ActionType.GET_SEARCH_LIST, getSearch);
}

export default saga;
