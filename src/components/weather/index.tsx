import { Spin } from 'antd';
import React, {
  FC, ReactElement, memo, useEffect, useState,
} from 'react';
import Skycons, { SkyconsType } from 'react-skycons';
// import { weatherRequest } from '@src/services/jsonp-request';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherInfoAction } from '@components/weather/store/action-creators';
import { RootReducerStateType } from '@src/common/types/sotre-types/root-reducer-state-type';
import { WeatherWrapper } from './style';

const Weather: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { weatherInfo } = useSelector((state:RootReducerStateType) => ({
    weatherInfo: state.weather.weatherInfo,
  }));
  const [whetherLoading, setWhetherLoading] = useState<boolean>(true);

  // 使用地理位置
  useEffect(() => {
    dispatch(getWeatherInfoAction());
  }, []);

  useEffect(() => {
    if (weatherInfo) {
      setWhetherLoading(false);
    }
  }, [weatherInfo]);
  // const canvasId = 'canvas';

  // useEffect(() => {
  //   const canvas = document.querySelector('#canvas-weather');
  //   // skycons
  //   const skycons = new Skycons({
  //     color: '#0099ff',
  //     // resizeClear: true, // 在Android上，需要添加一个讨厌的hack： {"resizeClear": true}
  //   });
  //   console.log(skycons);
  //
  //   skycons.add(canvas, Skycons.DAY_SUNNY);
  //   skycons.play();
  // }, []);

  const city = weatherInfo?.city;
  const dayTemperature = weatherInfo?.forecasts[0].dayTemp;
  const nightTemperature = weatherInfo?.forecasts[0].nightTemp;
  const weather = weatherInfo?.forecasts[0].dayWeather;

  // const svgProps = {
  //   style: { backgroundColor: 'rgb(150,203,249)', strokeStyle: 'red' },
  // };
  return (
    <Spin size="small" spinning={whetherLoading}>
      <WeatherWrapper>
        <span className="city">{city || '北京'}</span>
        {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgBAMAAAB54XoeAAAAHlBMVEXi7/rj7/pMaXHf6vPj7/rh7vjh7ffi7vjh7ffh7feN85fmAAAACnRSTlP79gCh2R9ttUaO7kcV+QAAA2hJREFUaN7t2r1P20AUAPBn1VLWPCUt7UiFgYzUSkRGK6kyYxU6J6VqVzcdyhgLIjGGKoQ/lwEuvu9PD1V19wf89N59vjsbPrbcIIIRjGAEIxjBCEYwgv84mF1elu2B2fpvnuf5411L4Don7bFsAczu86aN63DwW56bRCvwajfF/vTm533OtlHpBV79xpfWTWeceO4DXiNpANBfsuLCGcw2e68LAJAuDUkbwKxiPUHcOoJz5EFI2ZEuncDbxkMg7YARH1zAAYoBAsCE6UUHkOpAKkCARDfQOvCLPEBIDjRzUQOeFgoQEnqkx9bgCuUZ8+OysAQzZYBciENLkO5BHoSecpzVYKUDmYEurUB6DvJdCJDQc7G2AldaEDqqxaIEC2W6Qs5DG/BYy7Hrb2QDXhg8eiqObcDK4DG7WGkGM5MHsHQCB0aP7sTaDB7KJ4ti4izM4NwYIN2JFmBhDBDQGlzvpoU5QHpUtjrwqlIuN/VyfiqV4A80LRHpWTVSgFSdYAoQ4A29hT3JwQ06gB3m8PsuA281W6oJJCUEDX5FlwC5moQcp6A4Nt3B1wUI0sLIJmOugCD7LIhbqi2IHPiy6YB0hG0yFiJ8OVtAHqANCEtZxQ3SHrQDk5kkZwKeomsXAgDMxBIeZIWHNcjWnvmQAis/MBGqWZBmbA1ys7vcg0e+IFsq1ntwg+6DLCkVFwTM0BtkNp1PBBwEgHSIQwJeBIB0L54TcB4CJhKwCgGp2T16BYUxcQM7AngcBiYCeCKAXb+cCXgYCPZ4cBUIpvwozwNB5MENho3K/jAgK6UKBSfcWi5CwR6320jArtfUrtsGyY6NGJhzyp0pbYH7U0+SslvOyJ3LRWiICVc5VO2ATW1zhqE5N/cfxVp2PaiaKlux2ziGmHAV7CEGhpg2t2bFju0YYto8ZYD0nHcNsc/dUzIMFDvNFVdxLjuKPf6uN8cwccLfRo8wTPzDX8CP1aDVnUq80RfoTyb4QQRXGNLeiuBJEPggglkR4PVlT1UhOb+Tvc4NAsBf0ue+M/+M5a/E/sPyWfHs7B1irQB9e/G98lvA3K8HayV42kIPah6CLNuB9iPXrXvCC/1Xs40ruDV8KMwcxaHxU2Z2HRaf9snU1Ca235fXOwttdnMX/3OIYAQjGMEIRjCC/z/4DPQLL9/gazh/AAAAAElFTkSuQmCC" alt="" /> */}
        <Skycons
          color="rgb(150,203,249)"
          type={SkyconsType.SLEET}
          animate
          size={24}
          resizeClear
        />
        <span className="dayTemperature">
          {dayTemperature}
          ℃
        </span>
        <span className="nightTemperature">
          -
          {nightTemperature}
          ℃
        </span>

        {/* <canvas id="canvas-weather" width={40} height={40} /> */}
        <span className="weather">{weather}</span>
      </WeatherWrapper>
    </Spin>

  );
};

export default memo(Weather);
