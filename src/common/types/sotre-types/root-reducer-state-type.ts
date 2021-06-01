import { AnyAction, CombinedState, Reducer } from 'redux';

import { User } from '@pages/login/typing';
import { IDefaultData } from '@src/components/weather/store/reducer';
import { ICategory } from '@src/pages/category/typing';
import {
  IDetails, IProduct, ISearch, IUploadDate,
} from '@src/pages/product/typing';
import { RouterState } from 'react-router-redux';
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

// 商品管理的 reducer数据
export interface IProductState {
    productList:IProduct[]
    searchList:ISearch[]
    detail:IDetails | null
    addProduct:{
        currentSelectedClassifyId:number | null
        richTextEditorContent:string | null
        UploadUrlList:IUploadDate | null
    }
}

export interface IRootReducerStateType {
    auth: ILoginState
    weather:IDefaultData
    classify:ICategoryState
    product:IProductState
}

export type ReducerType = Reducer<CombinedState<{auth: ILoginState, weather: IDefaultData, classify: ICategoryState, product: IProductState}>, IActionType>
