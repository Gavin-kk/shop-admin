import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { IResponse } from '@src/common/types/sotre-types/response';
import { getRoleListRequest } from '@src/services/role-request';
import { message } from 'antd';
import { changeRoleListAction } from '@pages/role/store/action-creators';
import { ActionType } from './constant';
import { IRoleList } from '../typing';

function* getRole() {
  try {
    const result:AxiosResponse<IResponse<IRoleList[]>> = yield getRoleListRequest();
    yield put(changeRoleListAction(result.data.data));
  } catch (error) {
    message.error('服务器错误');
  }
}

function* saga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(ActionType.GET_ROLE_LIST, getRole);
}

export default saga;
