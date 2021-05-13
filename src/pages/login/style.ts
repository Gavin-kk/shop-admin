import styled from 'styled-components';

export const LoginWrapper = styled.div.attrs({

})`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgb(244,244,244);
  
  > .login-form-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 400px;
    height: 400px;
    background: #ececec;
    border-radius: 52px;
    box-shadow: 0 0 17px #888888;
    
    > .login-container {
      position: absolute;
      left: 20px;
      top: 20px;
      width: 360px;
      height: 360px;
      border-radius: 15px;
      
      .login-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
      }
      
      .from {
        width: 100%;

        .ant-row {
          justify-content: center;
        }
        
        .submit-login {
          width: 100%;
        }
      }
    }
  }
`;
