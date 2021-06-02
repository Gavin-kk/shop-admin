import React, {
  FC,
  ReactElement,
  memo, useEffect,
} from 'react';
import { useSelector, shallowEqual } from 'react-redux';

// 类型
import { IRootReducerStateType } from '@src/common/types/sotre-types/reducer.interface';
import { PageProps } from '@src/common/types/router-component-props-type';

// 组件和样式
import { Card } from 'antd';
import MForm from '@pages/login/components/form';
import FormErrorMsg from '@components/form-error-msg';

import { USER_KEY } from '@src/common/constant/auth-constant';
import { LoginWrapper } from './style';

const Login: FC<PageProps> = (props:PageProps): ReactElement => {
  const { history } = props;
  const { errMsg, isLogin } = useSelector((state:IRootReducerStateType) => ({
    errMsg: state.auth.loginErrMsg,
    isLogin: state.auth.whetherToLogIn,
  }), shallowEqual);

  useEffect(() => {
    const token:string | null = localStorage.getItem(USER_KEY);
    if (token) {
      history.replace('/admin');
    }
  }, [isLogin]);

  return (
    <LoginWrapper>
      <div className="login-form-box">
        <Card className="login-container">
          <div className="login-title">
            <h2>用 户 登 录</h2>
          </div>
          <div className="from">
            {/* 表单验证 */}
            <MForm />
            { errMsg && (<FormErrorMsg errMsg={errMsg} />) }
          </div>
        </Card>
      </div>
    </LoginWrapper>
  );
};

export default memo(Login);
