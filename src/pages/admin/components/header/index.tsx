import React, {
  FC, ReactElement, memo, useCallback,
} from 'react';
import { Button } from 'antd';
import LocalStorage from '@utils/local-storage-utils';
import { USER_KEY } from '@src/common/constant/auth-constant';
import { changeLoginStateAction, changeUserInfoAction } from '@pages/login/store/actions-creators';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeaderWrapper } from './style';

const AdminHeader: FC = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  // 退出登录
  const signOut = useCallback(() => {
    LocalStorage.removePermanentlyStoreData(USER_KEY);
    dispatch(changeLoginStateAction(false));
    dispatch(changeUserInfoAction(null));
    history.replace('/login');
  }, [dispatch]);

  return (
    <HeaderWrapper>
      <h2>header</h2>
      <Button onClick={() => signOut()}>退出登录</Button>
    </HeaderWrapper>
  );
};

export default memo(AdminHeader);
