import { SkyconsType } from 'react-skycons';

type IWeatherIconType = {
  title: string,
  type: SkyconsType,
}
export const weatherIconArr:IWeatherIconType[] = [
  {
    title: '晴',
    type: SkyconsType.CLEAR_DAY,
  },
  {
    title: '云',
    type: SkyconsType.CLOUDY,
  },
  {
    title: '雨',
    type: SkyconsType.RAIN,
  },
  {
    title: '雪',
    type: SkyconsType.SNOW,
  },
  {
    title: '风',
    type: SkyconsType.WIND,
  },
  {
    title: '雾',
    type: SkyconsType.FOG,
  },
];
