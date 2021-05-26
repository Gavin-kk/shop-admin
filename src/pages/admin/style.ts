import styled from 'styled-components';

export const AdminWrapper = styled.div`
  height:100%;
  
  .layout {
    height: 100%;
    
    >.ant-layout-sider {
      width:256px !important;
      max-width: 256px !important; ;
      min-width: 256px !important;
      flex: 0 0 256px !important;
    }
    
    .head-parent {
      padding: 0 25px;
      background: #fff;
    }
    
    .content {
      margin: 25px;
      margin-bottom: 0;
      height: 100%;
      min-height: 400px;
      background: white;
    }
  }
`;
