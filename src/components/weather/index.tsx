import React, {
  FC, ReactElement, memo, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spin } from 'antd';
import Skycons, { SkyconsType } from 'react-skycons';

import { IRootReducerStateType } from '@src/common/types/sotre-types/root-reducer-state-type';

import { weatherIconArr } from '@src/config/weather-icon';
import { getWeatherInfoAction } from '@components/weather/store/action-creators';
import { WeatherWrapper } from './style';

const Weather: FC = (): ReactElement => {
  const [whetherLoading, setWhetherLoading] = useState<boolean>(true);
  const [weatherIcon, setWeatherIcon] = useState<SkyconsType>(SkyconsType.CLEAR_DAY);

  const { weatherInfo } = useSelector((state:IRootReducerStateType) => ({
    weatherInfo: state.weather.weatherInfo,
  }));

  // 要显示的天气Icon的类型
  const dispatch = useDispatch();

  useEffect(() => {
    const time = setInterval(() => {
      if (window.BMap) {
        clearInterval(time);
        // 使用地理位置并获取天气信息
        // dispatch(getWeatherInfoAction());
      }
    }, 100);
    return () => {
      clearInterval(time);
    };
  }, []);

  useEffect(() => {
    if (weatherInfo) {
      setWhetherLoading(false);
    }
  }, [weatherInfo]);

  useEffect(() => {
    if (weatherInfo) {
      weatherIconArr.forEach((item) => {
        const doesItContain = weatherInfo?.forecasts[0].dayWeather.indexOf(item.title);
        if (doesItContain !== -1) {
          setWeatherIcon(item.type);
        }
      });
    }
  }, [weatherInfo]);

  const city:string | undefined = weatherInfo?.city;
  const dayTemperature:number | undefined = weatherInfo?.forecasts[0].dayTemp;
  const nightTemperature: number | undefined = weatherInfo?.forecasts[0].nightTemp;
  const weather: string | undefined = weatherInfo?.forecasts[0].dayWeather;

  return (
    <Spin size="small" spinning={whetherLoading}>
      <WeatherWrapper>
        <span className="city">{city || '北京'}</span>
        <Skycons
          color="rgb(150,203,249)"
          type={weatherIcon}
          animate
          size={24}
          resizeClear
          className="weather"
        />
        <span className="nightTemperature">
          {nightTemperature || 0}
          ℃
        </span>
        <span className="gap">
          -
        </span>
        <span className="dayTemperature">
          {dayTemperature || 0}
          ℃
        </span>
        <span className="weather">{weather}</span>
      </WeatherWrapper>
    </Spin>

  );
};

export default memo(Weather);
