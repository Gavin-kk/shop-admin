import {
  ForkEffect, put, takeEvery,
} from 'redux-saga/effects';
import { ActionType } from '@pages/product/store/constant';
import { AxiosResponse } from 'axios';
import {
  getProductRequest,
  changeProductStatusRequest,
  searchProductsRequest,
  getGoodsDetailRequest,
  deletePictureRequest,
  addingGoodsRequest,
  updateProductRequest,
} from '@src/services/product-request';
import { IResponse } from '@src/common/types/sotre-types/response';
import { message } from 'antd';
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { AVAILABLE, TAKE_THE_PRODUCT_OFF_THE_SHELF } from '@src/common/constant/product-constant';
import { SubmitType } from '@pages/product/components/details-modification';
import { IDetails, IProduct, ISearch } from '../typing';
import {
  changeGoodsDetailAction,
  changeProductListAction,
  changeSearchListAction,
  getProductListAction,
} from './action-creators';

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
    yield changeProductStatusRequest(id, AVAILABLE);
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
    yield changeProductStatusRequest(id, TAKE_THE_PRODUCT_OFF_THE_SHELF);
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
    const reslut:AxiosResponse<IResponse<ISearch[]>> = yield searchProductsRequest(pageNum, pageSize, content);
    yield put(changeSearchListAction(reslut.data.data));
  } catch (error) {
    yield message.error(error.response.data.message || error.response.data.msg);
  }
}

function* getGoodsDetail(action:IActionType) {
  const { id } = action.data;
  try {
    const result:AxiosResponse<IResponse<IDetails[]>> = yield getGoodsDetailRequest(id);
    yield put(changeGoodsDetailAction(result.data.data[0]));
  } catch (error) {
    yield message.error(error.response.data.message || error.response.data.msg);
  }
}

function* deleteUploadedImage(action:IActionType) {
  const { name } = action.data;
  try {
    yield deletePictureRequest(name);
    message.success('删除成功');
  } catch (error) {
    message.error(error.response.data.msg || error.response.data.message);
  }
}

function* addProduct(action:IActionType) {
  const submit:SubmitType = action.data;
  try {
    yield addingGoodsRequest(submit);
    window.history.back();
    message.success('添加成功');
  } catch (error) {
    message.error(error.response.data.message || error.response.data.msg);
  }
}

function* updateProduct(action:IActionType) {
  const summit:SubmitType = action.data;
  try {
    yield updateProductRequest(summit);
    window.history.back();
    message.success('更新成功');
  } catch (error) {
    message.error(error.response.data.message || error.response.data.msg);
  }
}

function* saga(): Generator<ForkEffect<never>> {
  yield takeEvery(ActionType.GET_PRODUCT_LIST, getProductList);
  yield takeEvery(ActionType.SEND_NOW_ON_SHELF, sendNowOnShelf);
  yield takeEvery(ActionType.SEND_OFF_SHELF, offShelf);
  yield takeEvery(ActionType.GET_SEARCH_LIST, getSearch);
  yield takeEvery(ActionType.GET_GOODS_DETAIL, getGoodsDetail);
  yield takeEvery(ActionType.DELETE_UPLOAD_IMG, deleteUploadedImage);
  yield takeEvery(ActionType.ADD_PRODUCT, addProduct);
  yield takeEvery(ActionType.UPDATE_PRODUCT, updateProduct);
}

export default saga;
