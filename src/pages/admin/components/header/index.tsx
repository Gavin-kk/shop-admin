import React, {
  FC, ReactElement, memo, useCallback, MouseEvent, useEffect, useState,
} from 'react';
import { message } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LocalStorage from '@utils/local-storage-utils';
import { USER_KEY } from '@src/common/constant/auth-constant';
import { changeLoginStateAction, changeUserInfoAction } from '@pages/login/store/actions-creators';
import { RootReducerStateType } from '@src/common/types/sotre-types/root-reducer-state-type';
import MyDate from '@components/date';
import Weather from '@components/weather';
import { HeaderWrapper } from './style';

const AdminHeader: FC = (): ReactElement => {
  const { userInfo } = useSelector((state:RootReducerStateType) => ({
    userInfo: state.auth.userInfo,
  }), shallowEqual);

  const history = useHistory();
  const dispatch = useDispatch();

  // 退出登录
  const signOut = useCallback((event:MouseEvent) => {
    event.preventDefault();
    LocalStorage.removePermanentlyStoreData(USER_KEY);
    dispatch(changeLoginStateAction(false));
    dispatch(changeUserInfoAction(null));
    history.replace('/login');
  }, [dispatch]);

  return (
    <HeaderWrapper>
      <div className="top">
        <div className="date">
          {/* 日期组件 */}
          <MyDate />
        </div>
        <span>
          欢迎
          <span>{ userInfo?.data?.username }</span>
        </span>
        <a onClick={(event:MouseEvent) => signOut(event)}>退出登录</a>
      </div>
      <div className="bottom">
        <h3>首页</h3>
        <div className="right">
          {/* 天气组件 */}
          <Weather />
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default memo(AdminHeader);
