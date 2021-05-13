import { produce } from 'immer';

import { actionType } from '@src/common/types/sotre-types/action-type';
import { WritableDraft } from 'immer/dist/internal';

interface IState {
    flag:boolean,
}
const defaultData:IState = {
  flag: false,
};

const reducer = (state:IState = defaultData, action: actionType):IState => produce(state, (draftState: WritableDraft<IState>) => {
  switch (action.type) {
    default:
      return state;
  }
});
export default reducer;
