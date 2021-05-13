import { actionType } from '../common/types/sotre-types/action-type';
import { ActionTypeConstant } from './constant';

export const changeListAction = ():actionType => ({
  type: ActionTypeConstant.changelist,
});
