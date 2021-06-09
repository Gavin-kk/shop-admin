import styled from 'styled-components';

export const PersonalSettingsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .upload-box {
    position: relative;
   
    
    .avatar-uploader {
  
      .ant-upload {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    
    .mask {
      display: none;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 101px;
      height: 101px;
      background: rgba(0,0,0,.5);
      color: white;
      border-radius: 50%;
    }
    
    .show {
      display: flex;
    }
  }

`;

export const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HomeWrapper = styled.div`

  .show {
    display: inline-block;
  }
  
  .mask {
    
  }
`;
