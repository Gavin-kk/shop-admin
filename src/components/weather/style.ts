import styled from 'styled-components';

export const WeatherWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  //width: 200px;
  margin-left: 5px;
  
  span {
    height: 100%;
    line-height: 50px;
    vertical-align: middle;
    margin: 0 5px;
  }
  img {
    vertical-align: middle;
    width: 40px;
    height: 40px;
    margin: 0 5px;
  }

  .city {
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    padding: 0 10px;
    text-align: center;
    line-height: 50px;
  }
  
  .weather {
    margin-right: 8px;
  }
  
  .dayTemperature, .nightTemperature {
    //width: 32px;
    margin: 0;
    padding: 0;
    height: 100%  ;
  }
  
  .gap {
    width: 10px;
  }
`;
