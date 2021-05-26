import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;

  .top {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 50px;
    color: #000;
    border-bottom: 2px solid rgb(80,168,192);
    
   

    .date {
      height: 50px;
      margin-right: 20px;
      line-height: 50px;
    }
    
    > span > span {
      margin:0 5px
    }
    
    > a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 65px;
      height: 22px;
    }
  }
  
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    
    h3 {
      position: relative;
      height: 100%;
      line-height: 50px;
      font-size: 20px;
      font-weight: bold;
      color: #000;
      margin-left: 20px;
      margin-bottom: 0;
      
      &:after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -30px;
        border: 15px solid;
        border-color: #fff transparent transparent transparent ;
      }
    }
    
    .right {
      display: flex;
      align-items: center;
      height: 100%;
      
      >span {
        height: 100%;
        line-height: 50px;
        vertical-align: middle;
      }

      >img {
        vertical-align: middle;
        width: 40px;
        height: 40px;
        margin: 0 5px;
      }
      
      .date {
        
      }
    }
  }
`;
