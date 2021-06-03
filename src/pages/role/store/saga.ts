import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { IResponse } from '@src/common/types/sotre-types/response';
import { addRoleRequest, getRoleListRequest } from '@src/services/role-request';
import { message } from 'antd';
import { changeRoleListAction, getRoleListAction } from '@pages/role/store/action-creators';
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { AddRoleType } from '@pages/role/components/modal';
import moment from 'moment';
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

function* addRole(action:IActionType) {
  const roleInfo:AddRoleType = action.data;
  roleInfo.authTime = String(moment().valueOf());
  try {
    yield addRoleRequest(roleInfo);
    yield getRoleListAction;
    message.success('添加成功');
  } catch (error) {
    message.error('添加失败');
  }
}

function* saga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(ActionType.GET_ROLE_LIST, getRole);
  yield takeEvery(ActionType.ADD_ROLE, addRole);
}

export default saga;
