import { IActionType } from '@src/common/types/sotre-types/action-type';
import { ActionType } from './constant';

export const getRoleListAction:IActionType = {
  type: ActionType.GET_ROLE_LIST,
};

export const changeRoleListAction = (list:any):IActionType => ({
  type: ActionType.CHANGE_ROLE_LIST,
  data: list,
});
