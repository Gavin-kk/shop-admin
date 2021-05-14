// 第三方
import { put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

// 类型
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { loginRequest } from '@src/services/login-request';
import { USER_KEY } from '@src/common/constant/auth-constant';
import LocalStorage from '@utils/local-storage-utils';
import { IUserInfo } from '@pages/login/typing';

// 网络请求 action等等
import { SEND_LOGIN_REQUEST } from './constant';

import { changeLoginErrorMessageAction, changeLoginStateAction, changeUserInfoAction } from './actions-creators';

// 工具

// 自己的组件
function* sendLoginRequest(action: IActionType) {
  try {
    const result: AxiosResponse<IUserInfo> = yield loginRequest(action.data);

    if (!result.data.status) {
      // 正确的取到的数据
      yield put(changeUserInfoAction(result.data.data));
      yield put(changeLoginErrorMessageAction(null));
      yield put(changeLoginStateAction(true));
      LocalStorage.permanentlyStoreData(USER_KEY, result.data.data);
    } else {
      // 错误
      yield put(changeLoginErrorMessageAction((result.data.msg as string)));
    }
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
}

function* saga(): Generator {
  yield takeEvery(SEND_LOGIN_REQUEST, sendLoginRequest);
}

export default saga;
