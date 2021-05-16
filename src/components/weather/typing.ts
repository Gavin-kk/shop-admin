/* Forecasts */
export interface Forecasts {
    date: string;
    week: string;
    dayWeather: string;
    nightWeather: string;
    dayTemp: number;
    nightTemp: number;
    dayWindDir: string;
    nightWindDir: string;
    dayWindPower: string;
    nightWindPower: string;
}

/* 天气信息响应数据类型 */
export interface IWeatherInfo {
    province: string;
    city: string;
    adcode: string;
    reportTime: string;
    info: string;
    forecasts: Forecasts[];
}
