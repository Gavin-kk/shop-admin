import { CombinedState, Reducer } from 'redux';

import { User } from '@pages/login/typing';
import { IDefaultData } from '@src/components/weather/store/reducer';
import { ICategory } from '@src/pages/admin/c-pages/category/typing';
import { IActionType } from './action-type';

// 登录页面的 reducer 数据的状态
export interface ILoginState {
    loginErrMsg: string | null
    userInfo: User | null
    whetherToLogIn:boolean
}

// 商品分类页面的 reducer
export interface ICategoryState {
    classifyList:ICategory[]
    currentId:number | null
}
export interface IRootReducerStateType {
    auth: ILoginState
    weather:IDefaultData,
    classify:ICategoryState
}

export type ReducerType = Reducer<CombinedState<IRootReducerStateType>, IActionType>
