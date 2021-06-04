import { produce } from 'immer';
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { WritableDraft } from 'immer/dist/internal';
import { IUser } from '@src/common/types/sotre-types/reducer.interface';
import { ActionType } from './constant';

const initData:IUser = {
  userList: [],
  userInfo: null,
  selectedUserId: null,
  selectedRoleId: null,
};

function reducer(state = initData, action:IActionType):IUser {
  return produce(state, (draft:WritableDraft<IUser>) => {
    switch (action.type) {
      case ActionType.CHANGE_USER_LIST:
        draft.userList = action.data;
        return draft;
      case ActionType.CHANGE_USER_INFO_USER:
        draft.userInfo = action.data;
        return draft;
      case ActionType.CHANGE_SELECTED_USER_ID:
        draft.selectedUserId = action.data;
        return draft;
      case ActionType.CHANGE_CURRENT_SELECT_ROLE_ID:
        draft.selectedRoleId = action.data;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
