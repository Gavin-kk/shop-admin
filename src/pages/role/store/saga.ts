import { ForkEffect, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { IResponse } from '@src/common/types/sotre-types/response';
import {
  addRoleRequest, deleteRoleRequest, editRoleRequest, getRoleListRequest, searchRoleRequest,
} from '@src/services/role-request';
import { message } from 'antd';
import { changeRoleListAction, getRoleListAction } from '@pages/role/store/action-creators';
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { RoleType } from '@pages/role/typing';
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
  const roleInfo:RoleType = action.data;
  roleInfo.authTime = String(moment().valueOf());
  try {
    yield addRoleRequest(roleInfo);
    yield put(getRoleListAction);
    message.success('添加成功');
  } catch (error) {
    message.error('添加失败');
  }
}

function* updateRole(action:IActionType) {
  const info:RoleType = action.data;
  info.authTime = String(moment().valueOf());
  try {
    yield editRoleRequest(info);
    yield put(getRoleListAction);
    message.success('更新成功');
  } catch (error) {
    message.error('更新失败');
  }
}

function* deleteRole(action:IActionType) {
  const id:number = action.data;
  try {
    yield deleteRoleRequest(id);
    yield put(getRoleListAction);
    message.success('删除成功');
  } catch (error) {
    message.error('删除失败');
  }
}

function* searchRole(action:IActionType) {
  const content:string = action.data;
  try {
    const result:AxiosResponse<IResponse<IRoleList[]>> = yield searchRoleRequest(content);
    yield put(changeRoleListAction(result.data.data));
  } catch (error) {
    message.error('搜索失败');
  }
}
function* saga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(ActionType.GET_ROLE_LIST, getRole);
  yield takeEvery(ActionType.ADD_ROLE, addRole);
  yield takeEvery(ActionType.UPDATE_ROLE, updateRole);
  yield takeEvery(ActionType.DELETE_ROLE, deleteRole);
  yield takeEvery(ActionType.SEARCH_ROLE, searchRole);
}

export default saga;
