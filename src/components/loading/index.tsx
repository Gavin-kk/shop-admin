import React, { FC, ReactElement, memo } from 'react';
import { Spin } from 'antd';

import { LoadingWarpper } from './style';

const Loading: FC = (): ReactElement => (
  <LoadingWarpper>
    <Spin tip="Loading..." />
  </LoadingWarpper>
);

export default memo(Loading);
