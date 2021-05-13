import { combineReducers } from 'redux';

import { reducer as loginReducer } from '@pages/login/store';

const RootReducer = combineReducers({
  auth: loginReducer,
});
export default RootReducer;
