import { AnyAction, CombinedState, Reducer } from 'redux';

import { User } from '@pages/login/typing';
import { IDefaultData } from '@src/components/weather/store/reducer';
import { ICategory } from '@src/pages/category/typing';
import {
  IDetails, IProduct, ISearch, IUploadDate,
} from '@src/pages/product/typing';
import { RouterState } from 'react-router-redux';
import { IGetUserInfoResponse, IUserList } from '@src/pages/user/typing';
import { IRoleList } from '@src/pages/role/typing';
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

// 用户管理 reducer数据
export interface IUser {
    userList:IUserList[]
    userInfo: IGetUserInfoResponse | null
    selectedUserId:number | null
    selectedRoleId:number | null
}

// 角色管理 reducer 数据
export interface IRole {
    roleList:IRoleList[] | []
    info:IRoleList | null
}

export interface IRootReducerStateType {
    auth: ILoginState
    weather:IDefaultData
    classify:ICategoryState
    product:IProductState
    user:IUser
    role:IRole
}

export type ReducerType = Reducer<CombinedState<{auth: ILoginState, weather: IDefaultData, classify: ICategoryState, product: IProductState, user: {}}>, IActionType>
