import React, { FC, ReactElement, memo } from 'react';
import { Button } from 'antd';
import { HeaderWrapper } from './style';

interface IProps {
    signOut:() => void
}

const AdminHeader: FC<IProps> = (props:IProps): ReactElement => {
  const { signOut } = props;

  return (
    <HeaderWrapper>
      <h2>header</h2>
      <Button onClick={() => signOut()}>退出登录</Button>
    </HeaderWrapper>
  );
};

export default memo(AdminHeader);
