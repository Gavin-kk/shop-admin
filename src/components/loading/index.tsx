import React, { FC, ReactElement, memo } from 'react';
import { Spin } from 'antd';

const Loading: FC = (): ReactElement => (
  <Spin
    tip="请稍候..."
    style={
      {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }
    }
    delay={100}
  />
);

export default memo(Loading);
