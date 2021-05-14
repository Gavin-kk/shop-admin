import React, {
  FC,
  ReactElement,
  memo, useEffect,
} from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

// 类型
import { RootReducerStateType } from '@src/common/types/sotre-types/root-reducer-state-type';
import { PageProps } from '@src/common/types/sotre-types/router-component-props-type';

// 组件和样式
import { Card, message } from 'antd';
import MForm from '@pages/login/components/form';
import FormErrorMsg from '@components/form-error-msg';

import LocalStorage from '@utils/local-storage-utils';
import { USER_KEY } from '@src/common/constant/auth-constant';
import { changeLoginStateAction, changeUserInfoAction } from '@pages/login/store/actions-creators';
import { LoginWrapper } from './style';

const Login: FC<PageProps> = (props:PageProps): ReactElement => {
  const { history } = props;
  const dispatch = useDispatch();

  const { errMsg, whetherToLogIn } = useSelector((state:RootReducerStateType) => ({
    errMsg: state.auth.loginErrMsg,
    whetherToLogIn: state.auth.whetherToLogIn,
  }), shallowEqual);

  useEffect(() => {
    const user = LocalStorage.readPermanentlyStoreData(USER_KEY);
    if (user) {
      dispatch(changeUserInfoAction(user));
      dispatch(changeLoginStateAction(true));
      props.history.replace('/admin');
    }
  }, [dispatch]);

  useEffect(() => {
    if (whetherToLogIn) {
      history.replace('/admin');
      message.success('登录成功');
    }
  }, [whetherToLogIn]);

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
            {errMsg
            && (
            <FormErrorMsg errMsg={errMsg} />
            )}
          </div>
        </Card>
      </div>
    </LoginWrapper>
  );
};

export default memo(Login);
