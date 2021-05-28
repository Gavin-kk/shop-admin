import { combineReducers } from 'redux';

import { reducer as loginReducer } from '@pages/login/store';
import { reducer as weatherReducer } from '@components/weather/store';

import { ReducerType } from '@src/common/types/sotre-types/root-reducer-state-type';
import { reducer as classifyReducer } from '@src/pages/admin/c-pages/category/store';

const RootReducer:ReducerType = combineReducers({
  auth: loginReducer,
  weather: weatherReducer,
  classify: classifyReducer,
});
export default RootReducer;
