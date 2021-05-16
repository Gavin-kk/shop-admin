import { produce } from 'immer';
import { WritableDraft } from 'immer/dist/internal';

import { IActionType } from '@src/common/types/sotre-types/action-type';

import * as actionTypes from './constant';
import { IWeatherInfo } from '../typing';

export interface IDefaultData {
    weatherInfo:IWeatherInfo | null
}

const defaultData:IDefaultData = {
  weatherInfo: null,
};

function reducer(state = defaultData, action:IActionType):IDefaultData {
  return produce(state, (draftState: WritableDraft<IDefaultData>) => {
    switch (action.type) {
      case actionTypes.CHANGE_WEATHER_INFO:
        draftState.weatherInfo = action.data;
        return draftState;
      default:
        return draftState;
    }
  });
}

export default reducer;
