import { produce } from 'immer';
import { IActionType } from '@src/common/types/sotre-types/action-type';
import { WritableDraft } from 'immer/dist/internal';
import { IProductState } from '@src/common/types/sotre-types/root-reducer-state-type';
import { ActionType } from '@pages/product/store/constant';

const defaultState:IProductState = {
  productList: [],
  searchList: [],
};
function reducer(state = defaultState, action:IActionType):IProductState {
  return produce(state, (draft:WritableDraft<IProductState>) => {
    switch (action.type) {
      case ActionType.CHANGE_PRODUCT_LIST:
        draft.productList = action.data;
        return draft;
      case ActionType.CHANGE_SEARCH_LIST:
        draft.searchList = action.data;
        return draft;
      default:
        return draft;
    }
  });
}

export default reducer;