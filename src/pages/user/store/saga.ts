import {
  addUserRequest, assigningRolesRequest, deleteUserRequest, getUserInfoRequest, getUserListRequest,
  searchForUsersRequest,
  updateUserInfoRequest,
} from '@src/services/user-request';
import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { IResponse } from '@src/common/types/sotre-types/response';
import { IFormValues, IGetUserInfoResponse, IUserList } from '@pages/user/typing';
import { changeUserInfoAction, changeUserListAction, getUserListAction } from '@pages/user/store/action-creators';
import { message } from 'antd';
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { ActionType } from './constant';

function* getUserListSaga() {
  try {
    const result:AxiosResponse<IResponse<IUserList[]>> = yield getUserListRequest();
    yield put(changeUserListAction(result.data.data));
  } catch (error) {
    yield message.error('获取用户信息失败');
  }
}

function* addUser(action:IActionType) {
  const values:IFormValues = action.data;
  try {
    yield addUserRequest(values);
    yield put(getUserListAction);
    message.success('添加成功');
  } catch (error) {
    message.error(error.response.data.msg || error.response.data.msg);
  }
}

function* getUserinfo(action:IActionType) {
  try {
    const id:number = action.data;
    const result:AxiosResponse<IResponse<IGetUserInfoResponse>> = yield getUserInfoRequest(id);
    yield put(changeUserInfoAction(result.data.data));
  } catch (error) {
    message.error(error.response.data.msg || error.response.data.msg);
  }
}

function* updateUserInfo(action:IActionType) {
  const values = action.data;
  try {
    yield updateUserInfoRequest(values);
    yield put(getUserListAction);
    message.success('更新成功');
  } catch (error) {
    message.error(error.response.data.msg || error.response.data.message);
  }
}

function* deleteUser(action:IActionType) {
  const id:number = action.data;
  try {
    yield deleteUserRequest(id);
    yield put(getUserListAction);
    message.success('删除成功');
  } catch (error) {
    message.error(error.response.data.msg || error.response.data.message);
  }
}

function* searchForUsers(action:IActionType) {
  const content:string = action.data;
  try {
    const result:AxiosResponse<IResponse<IUserList[]>> = yield searchForUsersRequest(content);
    yield put(changeUserListAction(result.data.data));
  } catch (error) {
    message.error(error.response.data.msg || error.response.data.message);
  }
}

function* sendARoleAssignment(action:IActionType) {
  const { id } = action.data;
  const { roleId } = action.data;
  try {
    yield assigningRolesRequest(id, roleId);
    yield put(getUserListAction);
    yield message.success('分配成功');
  } catch (e) {
    yield message.error('分配失败');
  }
}

function* saga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(ActionType.GET_USER_LIST, getUserListSaga);
  yield takeEvery(ActionType.ADD_USER, addUser);
  yield takeEvery(ActionType.GET_USER_INFO_USER, getUserinfo);
  yield takeEvery(ActionType.UPDATE_USER_INFO, updateUserInfo);
  yield takeEvery(ActionType.DELETE_USER, deleteUser);
  yield takeEvery(ActionType.SEARCH_FOR_USERS, searchForUsers);
  yield takeEvery(ActionType.SEND_ASSIGN_ROLE_REQUEST, sendARoleAssignment);
}

export default saga;
