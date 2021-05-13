import { actionType } from '@src/common/types/sotre-types/action-type';
import { IFormType } from '@pages/login/types/form-submit-type';
import { SEND_LOGIN_REQUEST } from './constant';

export const sendLoginRequestAction = (user:IFormType):actionType => ({
  type: SEND_LOGIN_REQUEST,
  data: user,
});
