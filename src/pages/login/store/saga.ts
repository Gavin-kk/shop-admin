// 第三方
import { takeEvery, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

// 类型
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { loginRequest } from '@src/services/login-request';
import { IUserInfo } from '../types/login-response-type';

// 网络请求 action等等
import { SEND_LOGIN_REQUEST } from './constant';
import { changeLoginErrorMessageAction, changeLoginStateAction, changeUserInfoAction } from './actions-creators';

// 自己的组件
function* sendLoginRequest(action:IActionType) {
  try {
    const result:AxiosResponse<IUserInfo> = yield loginRequest(action.data);

    if (!result.data.status) {
      // 正确的取到的数据
      yield put(changeUserInfoAction(result.data.data));
      yield put(changeLoginErrorMessageAction(null));
      yield put(changeLoginStateAction(true));
    } else {
      // 错误
      yield put(changeLoginErrorMessageAction((result.data.msg as string)));
    }
  } catch (error:any) {
    console.log(error.message);
  }
}
function* saga():Generator {
  yield takeEvery(SEND_LOGIN_REQUEST, sendLoginRequest);
}
export default saga;
