import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';

import { IActionType } from '@src/common/types/sotre-types/action-type';
import { actionType } from '@pages/admin/c-pages/category/store/constant';
import { ICategoryState } from '@src/common/types/sotre-types/root-reducer-state-type';

const defaultData: ICategoryState = {
  classifyList: [],
  currentId: null, // 记录每次点击查看分类时的id 也就是 currentid 当前所在分类的id
};

function reducer(state = defaultData, action:IActionType):ICategoryState {
  return produce(state, (draft: WritableDraft<ICategoryState>) => {
    switch (action.type) {
      case actionType.CHANGE_CLASSIFY_LIST:
        draft.classifyList = action.data;
        return draft;
      case actionType.CHANGE_CURRENT_CLASSIFY_ID:
        draft.currentId = action.data;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;
