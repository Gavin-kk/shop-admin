import { IActionType } from '@src/common/types/sotre-types/action-type';
import { ActionType } from './constant';
import { RoleType, IRoleList } from '../typing';

export const getRoleListAction:IActionType = {
  type: ActionType.GET_ROLE_LIST,
};

export const changeRoleListAction = (list:IRoleList[]):IActionType => ({
  type: ActionType.CHANGE_ROLE_LIST,
  data: list,
});

// 添加角色
export const addRoleAction = (info:RoleType):IActionType => ({
  type: ActionType.ADD_ROLE,
  data: info,
});

// 更改当前选择的那一条数据
export const changeCurrentInfoAction = (info:IRoleList):IActionType => ({
  type: ActionType.CHANGE_INFO,
  data: info,
});

// 更新角色权限
export const updateRoleAction = (info:RoleType):IActionType => ({
  type: ActionType.UPDATE_ROLE,
  data: info,
});
// 删除角色
export const deleteRoleAction = (id:number):IActionType => ({
  type: ActionType.DELETE_ROLE,
  data: id,
});
// 搜索角色
export const searchRoleAction = (content:string):IActionType => ({
  type: ActionType.SEARCH_ROLE,
  data: content,
});
