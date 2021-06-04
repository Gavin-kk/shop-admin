import styled from 'styled-components';

export const AdminWrapper = styled.div`
  //height:100%;
  
  .layout {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  
  .ant-layout-has-sider {
    //height: 100%;
  }
  
  .ant-layout-sider {
    width:256px !important;
    max-width: 256px !important; ;
    min-width: 256px !important;
    flex: 0 0 256px !important;
  }
  
  .head-parent {
    padding: 0 25px;
    background: #fff;
    margin-left: 260px;
  }

  .content {
    margin: 25px 25px 0 260px;
    min-height: 400px;
    background: white;
  }
`;
