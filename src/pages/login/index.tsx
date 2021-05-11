import React, {
  FC,
  ReactElement,
  memo,
} from 'react';

import { LoginWrapper } from './style';

const Login: FC = (): ReactElement => (
  <LoginWrapper>
    <h2>登录页</h2>
  </LoginWrapper>
);

export default memo(Login);
