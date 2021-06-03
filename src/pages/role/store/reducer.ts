import { produce } from 'immer';
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { WritableDraft } from 'immer/dist/internal';
import { IRole } from '@src/common/types/sotre-types/reducer.interface';
import { ActionType } from './constant';

const initData:IRole = {
  roleList: [],
};

function reducer(state = initData, action:IActionType):IRole {
  return produce(state, (draft:WritableDraft<IRole>) => {
    switch (action.type) {
      case ActionType.CHANGE_ROLE_LIST:
        draft.roleList = action.data;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
