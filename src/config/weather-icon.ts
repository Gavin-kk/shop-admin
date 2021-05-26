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
  // {
  //   title: '晴月',
  //   type: SkyconsType.CLEAR_NIGHT,
  // },
  // {
  //   title: '多云日',
  //   type: SkyconsType.PARTLY_CLOUDY_DAY,
  // },
  // {
  //   title: '多云月',
  //   type: SkyconsType.PARTLY_CLOUDY_NIGHT,
  // },
];

// type TeathersType = {
//   title:string
//   position:string
// }
// export const weatherIcons:TeathersType[] = [
//   {
//     title: '晴',
//     position: '32px 71px',
//   },
//   {
//     title: '云',
//     position: '193px 82px',
//   },
//   {
//     title: '雨',
//     position: '365px 363px',
//   },
//   {
//     title: '雪',
//     position: '546px 364px',
//   },
//   {
//     title: '风',
//     position: '546px 364px',
//   },
//   {
//     title: '雾',
//     position: '188px 356px',
//   },
// ];

// iconName

// const haze = ['霾', '中度霾', '重度霾', '严重霾'];
// const cloud = ['少云', '晴间多云', '多云', '阴'];
// const wind = ['有风', '微风', '和风', '清风', '强风/劲风', '疾风', '大风', '烈风', '风暴', '狂爆风', '飓风', '热带风暴'];
