// 第三方
import { takeEvery, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

// 类型
import { actionType } from '@src/common/types/sotre-types/action-type';
// 网络请求等等
import { loginRequest } from '@request/login-request';
import { SEND_LOGIN_REQUEST } from './constant';
// 自己的组件
function* sendLoginRequest(action:actionType) {
  try {
    const result:AxiosResponse<any> = yield loginRequest(action.data);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
function* saga():Generator {
  yield takeEvery(SEND_LOGIN_REQUEST, sendLoginRequest);
}
export default saga;
