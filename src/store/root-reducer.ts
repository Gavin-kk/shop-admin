import { combineReducers } from 'redux';

import { reducer as loginReducer } from '@pages/login/store';
import { reducer as weatherReducer } from '@components/weather/store';

import { reducer as classifyReducer } from '@src/pages/category/store';
import { reducer as productReducer } from '@pages/product/store';
import { reducer as userReducer } from '@pages/user/store';
import { reducer as roleReducer } from '@pages/role/store';

const RootReducer = combineReducers({
  auth: loginReducer,
  weather: weatherReducer,
  classify: classifyReducer,
  product: productReducer,
  user: userReducer,
  role: roleReducer,
});
export default RootReducer;
