import { IActionType } from '@src/common/types/sotre-types/action-type';
import { IFormValues, IUserList } from '@pages/user/typing';
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
