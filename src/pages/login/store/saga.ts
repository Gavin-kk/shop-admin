// 第三方
import { put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

// 类型
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { getUserInfoRequest, loginRequest } from '@src/services/login-request';
import { USER_KEY } from '@src/common/constant/auth-constant';
import LocalStorage from '@utils/local-storage-utils';
import { ILoginResponse, UserResponse } from '@pages/login/typing';

// 网络请求 action等等
import { message } from 'antd';
import { SEND_LOGIN_REQUEST, GET_USER_INFO } from './constant';

import { changeLoginErrorMessageAction, changeLoginStateAction, changeUserInfoAction } from './actions-creators';

// 自己的组件
function* sendLoginRequest(action: IActionType) {
  try {
    const result: AxiosResponse<ILoginResponse> = yield loginRequest(action.data);
    // 正确的取到的数据
    yield put(changeUserInfoAction(result.data.data.user));
    yield put(changeLoginErrorMessageAction(null));
    yield put(changeLoginStateAction(true));
    LocalStorage.permanentlyStoreData(USER_KEY, result.data.data.token);
    // 错误
  } catch (error:any) {
    yield put(changeLoginErrorMessageAction((error.response.data.msg as string)));
  }
}

function* getUserInfo() {
  try {
    const result:AxiosResponse<UserResponse> = yield getUserInfoRequest();
    yield put(changeUserInfoAction(result.data.data));
    yield put(changeLoginStateAction(true));
  } catch (error:any) {
    message.error(error.response.data.msg || error.response.data.message);
    LocalStorage.removePermanentlyStoreData(USER_KEY);
    yield put(changeLoginStateAction(false));
  }
}

function* saga(): Generator {
  yield takeEvery(GET_USER_INFO, getUserInfo);
  yield takeEvery(SEND_LOGIN_REQUEST, sendLoginRequest);
}

export default saga;
