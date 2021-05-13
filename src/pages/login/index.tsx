import React, {
  FC,
  ReactElement,
  memo,
} from 'react';
import {
  Card,
} from 'antd';

import MForm from '@pages/login/c-pages/form';
import { LoginWrapper } from './style';

const Login: FC = (): ReactElement => (
  <LoginWrapper>
    <div className="login-form-box">
      <Card className="login-container">
        <div className="login-title">
          <h2>用 户 登 录</h2>
        </div>
        <div className="from">
          {/* 表单验证 */}
          <MForm />
        </div>
      </Card>
    </div>
  </LoginWrapper>
);

export default memo(Login);
