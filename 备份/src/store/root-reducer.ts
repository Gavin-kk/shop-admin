import { actionType } from '../common/types/action-type';
import { IState } from '../common/types/state-type';
import { ActionTypeConstant } from './constant';

const defaultState:IState = {
  loading: false,
  list: [],
};
const reducer = (state:IState = defaultState, action:actionType):IState => {
  switch (action.type) {
    case ActionTypeConstant.changelist:
      return { ...state, list: action.data };
    default:
      return state;
  }
};

export default reducer;
