import {
  takeEvery, put, ForkEffect, select,
} from 'redux-saga/effects';
import { actionType } from '@pages/admin/c-pages/category/store/constant';
import {
  addClassifyRequest,
  categoryListRequest,
  deleteClassifyRequest, getClassifyChildRequest,
  updateClassifyRequest,
} from '@src/services/admin-request';
import { AxiosResponse } from 'axios';
import { message } from 'antd';
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { IRootReducerStateType } from '@src/common/types/sotre-types/root-reducer-state-type';
import { ICategoryListResponse } from '../typing';
import {
  changeAListOfFirstLevelCategoriesAction,
  getAListOfFirstLevelCategoriesAction, getClassifyChildListAction, getState,
} from './actions-creators';

// 获取一级分类列表 dispatch 到 reducer 中
function* getAListOfCategories() {
  try {
    const result:AxiosResponse<ICategoryListResponse> = yield categoryListRequest();
    yield put(changeAListOfFirstLevelCategoriesAction(result.data.data));
  } catch (error) {
    message.error(error.response.data.message);
  }
}

function* addClassify(action:IActionType) {
  const state:IRootReducerStateType = yield select(getState);

  try {
    yield addClassifyRequest(action.data.categoryName, action.data.parentId);
    if (state.classify.currentId) {
      yield put(getClassifyChildListAction(state.classify.currentId));
    } else {
      yield put(getAListOfFirstLevelCategoriesAction);
    }
    message.success('添加成功');
  } catch (error) {
    message.error(error.response.data.msg || error.response.data.message);
  }
}

function* updateChangeClassify(action:IActionType) {
  const { categoryName, parentId } = action.data;
  const state:IRootReducerStateType = yield select(getState);
  try {
    yield updateClassifyRequest(categoryName, parentId);
    if (state.classify.currentId) {
      yield put(getClassifyChildListAction(state.classify.currentId));
    } else {
      yield put(getAListOfFirstLevelCategoriesAction);
    }
    message.success('更新成功');
  } catch (error) {
    message.error(error.response.data.message || error.response.data.msg);
  }
}

function* deleteClassify(action:IActionType) {
  const { id } = action.data;
  const state:IRootReducerStateType = yield select(getState);
  try {
    yield deleteClassifyRequest(id);
    if (state.classify.currentId) {
      yield put(getClassifyChildListAction(state.classify.currentId));
    } else {
      yield put(getAListOfFirstLevelCategoriesAction);
    }
    message.success('删除成功');
  } catch (error) {
    message.error(error.response.data.message || error.response.data.msg);
  }
}

function* getClassifyChildList(action:IActionType) {
  const { id } = action.data;
  try {
    const result:AxiosResponse<any> = yield getClassifyChildRequest(id);
    yield put(changeAListOfFirstLevelCategoriesAction(result.data.data));
  } catch (error) {
    message.error(error.response.data.message || error.response.data.msg);
  }
}

function* saga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(actionType.GET_CLASSIFY_LIST, getAListOfCategories);
  yield takeEvery(actionType.ADD_CLASSIFY, addClassify);
  yield takeEvery(actionType.UPDATE_CHANGE_CLASSIFY, updateChangeClassify);
  yield takeEvery(actionType.DELETE_CLASSIFY, deleteClassify);
  yield takeEvery(actionType.GET_CLASSIFY_CHILD_LIST, getClassifyChildList);
}

export default saga;
