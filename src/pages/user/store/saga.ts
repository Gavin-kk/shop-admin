import { addUserRequest, getUserListRequest } from '@src/services/user-request';
import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { IResponse } from '@src/common/types/sotre-types/response';
import { IFormValues, IUserList } from '@pages/user/typing';
import { changeUserListAction, getUserListAction } from '@pages/user/store/action-creators';
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

function* saga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(ActionType.GET_USER_LIST, getUserListSaga);
  yield takeEvery(ActionType.ADD_USER, addUser);
}

export default saga;
