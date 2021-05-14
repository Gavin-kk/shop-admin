import { IActionType } from '../common/types/sotre-types/action-type';
import { ActionTypeConstant } from './constant';

export const changeListAction = ():IActionType => ({
  type: ActionTypeConstant.changelist,
});
