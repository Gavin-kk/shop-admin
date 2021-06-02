import styled from 'styled-components';

export const ListWrapper = styled.div`

  .ant-list-item {
    display: block;
    
    .detail-box {
      display: flex;
      .detail-desc {
        display: flex;
        align-items: center;
        //font-weight: bold;
        //font-size: 15px;
        margin-left: 35px;
        min-width: 120px;
      }
      .detail {
        width: 1500px;
        overflow: hidden;
        p {
          margin: 0;
        }
      }
    }
    .ant-image {
      margin-right: 15px;
    }
  }

  .ant-list-item > span:first-of-type {
    display: inline-block;
    min-width:120px;
    margin-left: 35px;
    //font-weight: bold;
    //font-size: 15px;
  }

  .img-item {
    display: flex;
    justify-content: normal;
  }

  .detail-loading {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }

`;
