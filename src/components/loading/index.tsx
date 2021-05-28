import React, { FC, ReactElement, memo } from 'react';
import { Spin } from 'antd';

interface IProps {
    size?:'small' | 'default' | 'large' | undefined
}

const Loading: FC<IProps> = (props:IProps): ReactElement => (
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
    size={props.size}
    delay={200}
  />
);

Loading.defaultProps = {
  size: undefined,
};

export default memo(Loading);
