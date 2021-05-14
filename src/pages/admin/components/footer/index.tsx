import React, { FC, ReactElement, memo } from 'react';
import { FooterWrapper } from './style';

const AdminFooter: FC = (): ReactElement => (
  <FooterWrapper>
    <h3>推荐使用谷歌浏览器, 以获得更佳体验</h3>
  </FooterWrapper>
);

export default memo(AdminFooter);
