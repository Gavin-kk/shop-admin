import { IActionType } from '@src/common/types/sotre-types/action-type';
import * as actionTypesConstant from './constant';

export const sendLoginRequestAction = <T>(user:T):IActionType => ({
  type: actionTypesConstant.SEND_LOGIN_REQUEST,
  data: user,
});

// 改变登录页面的 errorMessage
export const changeLoginErrorMessageAction = (msg:string | null):IActionType => ({
  type: actionTypesConstant.CHANGE_LOGIN_ERROR_MESSAGE,
  data: msg,
});

// 登录成功获取到的用户信息存储到redux中
export const changeUserInfoAction = (info:unknown):IActionType => ({
  type: actionTypesConstant.CHANGE_USER_INFO,
  data: info,
});

// 改变登录状态
export const changeLoginStateAction = (whetherToLogIn:boolean):IActionType => ({
  type: actionTypesConstant.CHANGE_LOGIN_STATE,
  data: whetherToLogIn,
});

// 请求用户信息
export const getUserInfoAction:IActionType = {
  type: actionTypesConstant.GET_USER_INFO,
};
