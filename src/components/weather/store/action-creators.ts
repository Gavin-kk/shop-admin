import { Dispatch } from 'redux';
import { message } from 'antd';

import { IActionType } from '@src/common/types/sotre-types/action-type';
import * as actionTypes from './constant';
import { IWeatherInfo } from '../typing';

export const changeWeatherInfoAction = (info:IWeatherInfo):IActionType => ({
  type: actionTypes.CHANGE_WEATHER_INFO,
  data: info,
});

export const getWeatherInfoAction = ():any => (dispatch:Dispatch<any>) => {
  try {
    const geoc = new window.BMap.Geocoder();
    const geolocation = new window.BMap.Geolocation();
    geolocation.getCurrentPosition((r:any) => {
      geoc.getLocation(r.point, (rs:any) => {
        window.AMap.plugin('AMap.Weather', () => {
          // 创建天气查询实例
          const weather = new window.AMap.Weather();
          // 得到天气的城市信息
          const { city } = rs.addressComponents;
          // 执行实时天气信息查询
          weather.getForecast(city, (err:any, data:any) => {
            if (err) {
              message.error(err);
            } else {
              dispatch(changeWeatherInfoAction(data));
            }
          });
        });
      });
    });
  } catch (error) {
    message.error(`天气数据请求出错${error.message}`);
  }

  /* const geoc = new window.BMap.Geocoder();
    // weatherRequest('呼和浩特市');
  // navigator.geolocation.getCurrentPosition((position) => {});

    // const point = new window.BMap.Point(position.coords.longitude, position.coords.latitude);
    const geolocation = new window.BMap.Geolocation();
    geolocation.getCurrentPosition((r:any) => {
      geoc.getLocation(r.point, (rs:any) => {
        // setWhetherLoading(false);
        // console.log(rs); // 具体信息可以打印出来看一下，根据需求取值     经纬度，城市，街道等等
        console.log(rs, 'rs');
        window.AMap.plugin('AMap.Weather', () => {
          // 创建天气查询实例
          const weather = new window.AMap.Weather();
          // 得到天气的城市信息
          const { city } = rs.addressComponents;

          // 执行实时天气信息查询forecasts
          weather.getForecast(city, (err:any, data:any) => {
            console.log(err, data, 'gaode');
            // 设置城市信息
            setCity(city);
            // 取消loading状态
            setWhetherLoading(false);
            // 设置天气信息
          });
        });
      });
    }); */
};
