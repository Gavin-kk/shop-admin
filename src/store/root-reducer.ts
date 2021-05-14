import { combineReducers } from 'redux';

import { reducer as loginReducer } from '@pages/login/store';

import { ReducerType } from '@src/common/types/sotre-types/root-reducer-state-type';

const RootReducer:ReducerType = combineReducers({
  auth: loginReducer,
});
export default RootReducer;
