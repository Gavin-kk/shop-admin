import { CombinedState, Reducer } from 'redux';

import { IUserInfo } from '@pages/login/types/login-response-type';
import { IActionType } from './action-type';

export interface ILoginState {
    loginErrMsg: string | null
    userInfo: IUserInfo | null
    whetherToLogIn:boolean
}

export type RootReducerStateType = {
    auth: ILoginState
}

export type ReducerType = Reducer<CombinedState<RootReducerStateType>, IActionType>
