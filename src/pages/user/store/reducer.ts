import { produce } from 'immer';
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { WritableDraft } from 'immer/dist/internal';
import { IUser } from '@src/common/types/sotre-types/reducer.interface';
import { ActionType } from './constant';

const initData:IUser = {
  userList: [],
};

function reducer(state = initData, action:IActionType):IUser {
  return produce(state, (draft:WritableDraft<IUser>) => {
    switch (action.type) {
      case ActionType.CHANGE_USER_LIST:
        draft.userList = action.data;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
