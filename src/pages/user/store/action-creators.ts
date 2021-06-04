import { IActionType } from '@src/common/types/sotre-types/action-type';
import { IFormValues, IGetUserInfoResponse, IUserList } from '@pages/user/typing';
import { ActionType } from './constant';
// 获取用户列表
export const getUserListAction:IActionType = {
  type: ActionType.GET_USER_LIST,
};
// 更改reducer中的userlist列表
export const changeUserListAction = (list:IUserList[]):IActionType => ({
  type: ActionType.CHANGE_USER_LIST,
  data: list,
});

// 发送添加用户请求
export const addUserAction = (values:IFormValues):IActionType => ({
  type: ActionType.ADD_USER,
  data: values,
});

// 获取用户信息以提供修改
export const getUserInfoAction = (id:number):IActionType => ({
  type: ActionType.GET_USER_INFO_USER,
  data: id,
});
// 更改当前记录的用户信息
export const changeUserInfoAction = (userInfo:IGetUserInfoResponse | null):IActionType => ({
  type: ActionType.CHANGE_USER_INFO_USER,
  data: userInfo,
});

// 更新用户信息
export const updateUserInfoAction = (values:IFormValues):IActionType => ({
  type: ActionType.UPDATE_USER_INFO,
  data: values,
});

// 删除用户
export const deleteUserAction = (id:number):IActionType => ({
  type: ActionType.DELETE_USER,
  data: id,
});

export const searchForUsersAction = (content:string): IActionType => ({
  type: ActionType.SEARCH_FOR_USERS,
  data: content,
});
// 更改当前选中的 id
export const changeCurrentSelectedUserId = (id:number | null): IActionType => ({
  type: ActionType.CHANGE_SELECTED_USER_ID,
  data: id,
});
// 更改当前分配角色下拉框选中的 id
export const changCurrentRoleSelectedId = (id:number | null): IActionType => ({
  type: ActionType.CHANGE_CURRENT_SELECT_ROLE_ID,
  data: id,
});
// 更改当前分配角色下拉框选中的 id
export const sendRequestForRoleAssignmentAction = (id:number, roleId:number): IActionType => ({
  type: ActionType.SEND_ASSIGN_ROLE_REQUEST,
  data: {
    id,
    roleId,
  },
});
