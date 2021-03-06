import React, { FC, ReactElement, memo } from 'react';
import { FooterWrapper } from './style';

const AdminFooter: FC = (): ReactElement => (
  <FooterWrapper>
    <h4>推荐使用谷歌浏览器, 以获得更佳体验</h4>
  </FooterWrapper>
);

export default memo(AdminFooter);
