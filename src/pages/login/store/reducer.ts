import { produce } from 'immer';

import { IActionType } from '@src/common/types/sotre-types/action-type';
import { ILoginState } from '@src/common/types/sotre-types/reducer.interface';

import { WritableDraft } from 'immer/dist/internal';

import * as actionTypes from './constant';

const defaultData:ILoginState = {
  whetherToLogIn: false,
  loginErrMsg: null,
  userInfo: null,
};

function reducer(state:ILoginState = defaultData, action: IActionType):ILoginState {
  return produce(state, (draftState: WritableDraft<ILoginState>) => {
    switch (action.type) {
      case actionTypes.CHANGE_LOGIN_ERROR_MESSAGE:
        draftState.loginErrMsg = action.data;
        return draftState;
      case actionTypes.CHANGE_USER_INFO:
        draftState.userInfo = action.data;
        return draftState;
      case actionTypes.CHANGE_LOGIN_STATE:
        draftState.whetherToLogIn = action.data;
        return draftState;
      default:
        return draftState;
    }
  });
}
export default reducer;
