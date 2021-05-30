import React, {
  FC, ReactElement, memo, useCallback, useEffect, useState,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { message, Popconfirm } from 'antd';

import LocalStorage from '@utils/local-storage-utils';
import { USER_KEY } from '@src/common/constant/auth-constant';
import { changeLoginStateAction, changeUserInfoAction } from '@pages/login/store/actions-creators';
import { IRootReducerStateType } from '@src/common/types/sotre-types/root-reducer-state-type';

import MyDate from '@components/date';
import Weather from '@components/weather';
import adminPageMenuConfig, { MenuType } from '@src/config/admin-page-menu-config';
import { HeaderWrapper } from './style';

const AdminHeader: FC = (): ReactElement => {
  const [title, setTitle] = useState<string>('首页');

  const { userInfo } = useSelector((state:IRootReducerStateType) => ({
    userInfo: state.auth.userInfo,
  }), shallowEqual);

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (history.location.pathname === '/admin/product/detail') {
      history.replace('/admin/product');
      message.error('非法访问');
    }
  }, [history]);

  // 退出登录
  const signOut = useCallback(() => {
    LocalStorage.removePermanentlyStoreData(USER_KEY);
    dispatch(changeLoginStateAction(false));
    dispatch(changeUserInfoAction(null));
    history.replace('/login');
  }, [dispatch]);

  useEffect(() => {
    titleProcessing(adminPageMenuConfig);
  }, [location.pathname]);

  // 判断 title 显示什么
  const titleProcessing = (adminPageMenuConfig:MenuType[]):void => {
    adminPageMenuConfig.forEach((item):void => {
      if (item.children) {
        titleProcessing(item.children);
      }
      if (history.location.pathname.indexOf((item.routerPath?.replace('/:id', '')) as string) !== -1) {
        setTitle(item.title);
      }
    });
  };

  return (
    <HeaderWrapper>
      <div className="top">
        <div className="date">
          {/* 日期组件 */}
          <MyDate />
        </div>
        <span>
          欢迎
          <span>{ userInfo?.username }</span>
        </span>
        <Popconfirm placement="bottom" title="确认退出吗?" onConfirm={signOut} okText="是" cancelText="否">
          <a href="javascript;">退出登录</a>
        </Popconfirm>
      </div>
      <div className="bottom">
        <h3>{title}</h3>
        <div className="right">
          {/* 天气组件 */}
          <Weather />
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default memo(AdminHeader);
