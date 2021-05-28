import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';

import { IActionType } from '@src/common/types/sotre-types/action-type';
import { actionType } from '@pages/admin/c-pages/category/store/constant';
import { ICategoryState } from '@src/common/types/sotre-types/root-reducer-state-type';

const defaultData: ICategoryState = {
  classifyList: [],
};

function reducer(state = defaultData, action:IActionType):ICategoryState {
  return produce(state, (draft: WritableDraft<ICategoryState>) => {
    switch (action.type) {
      case actionType.CHANGE_CLASSIFY_LIST:
        draft.classifyList = action.data;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
