import { CombinedState, Reducer } from 'redux';

import { IUserInfo } from '@pages/login/typing';
import { IDefaultData } from '@src/components/weather/store/reducer';
import { IActionType } from './action-type';

export interface ILoginState {
    loginErrMsg: string | null
    userInfo: IUserInfo | null
    whetherToLogIn:boolean
}

export type RootReducerStateType = {
    auth: ILoginState
    weather:IDefaultData
}

export type ReducerType = Reducer<CombinedState<RootReducerStateType>, IActionType>
