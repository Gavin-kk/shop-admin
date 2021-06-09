import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';

import { IActionType } from '@src/common/types/sotre-types/action-type';
import { IOrder } from '@src/common/types/sotre-types/reducer.interface';

import { ActionType } from './constant';

const defaultData:IOrder = {
  orderList: [],
};

function reducer(state:IOrder = defaultData, action: IActionType):IOrder {
  return produce(state, (draftState: WritableDraft<IOrder>) => {
    switch (action.type) {
      case ActionType.CHANGE_ORDER_TABLE_LIST:
        draftState.orderList = action.data;
        return draftState;
      default:
        return draftState;
    }
  });
}
export default reducer;
