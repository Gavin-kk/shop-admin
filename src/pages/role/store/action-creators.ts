import { IActionType } from '@src/common/types/sotre-types/action-type';
import { IRoleList } from '@pages/role/typing';
import { ActionType } from './constant';
import { AddRoleType } from '../components/modal';

export const getRoleListAction:IActionType = {
  type: ActionType.GET_ROLE_LIST,
};

export const changeRoleListAction = (list:IRoleList[]):IActionType => ({
  type: ActionType.CHANGE_ROLE_LIST,
  data: list,
});

// 添加角色
export const addRoleAction = (info:AddRoleType):IActionType => ({
  type: ActionType.ADD_ROLE,
  data: info,
});

// 更改当前选择的那一条数据
export const changeCurrentInfo = (info:IRoleList):IActionType => ({
  type: ActionType.CHANGE_INFO,
  data: info,
});
