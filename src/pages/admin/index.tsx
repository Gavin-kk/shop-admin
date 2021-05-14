import React, {
  FC, ReactElement, memo, useEffect, useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';

import { PageProps } from '@src/common/types/sotre-types/router-component-props-type';

import LocalStorage from '@utils/local-storage-utils';
import { USER_KEY } from '@src/common/constant/auth-constant';
import { changeLoginStateAction, changeUserInfoAction } from '@pages/login/store/actions-creators';

import AdminHeader from '@pages/admin/components/header';
import AdminFooter from '@pages/admin/components/footer';
import LeftNavbar from '@pages/admin/components/left-navbar';
import { renderRoutes } from 'react-router-config';
import { AdminWrapper } from './style';

const {
  Header, Footer, Sider, Content,
} = Layout;

const Admin: FC<PageProps> = (props:PageProps): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = LocalStorage.readPermanentlyStoreData(USER_KEY);
    if (!user) {
      props.history.replace('/login');
    } else {
      dispatch(changeLoginStateAction(true));
      dispatch(changeUserInfoAction(user));
    }
  }, [dispatch]);

  // 退出登录
  const signOut = useCallback(() => {
    LocalStorage.removePermanentlyStoreData(USER_KEY);
    dispatch(changeLoginStateAction(false));
    dispatch(changeUserInfoAction(null));
    props.history.replace('/login');
  }, [dispatch]);

  const routers = props.route?.routes;

  return (
    <AdminWrapper>
      <Layout className="layout">
        <Sider>
          <LeftNavbar />
        </Sider>
        <Layout>
          <Header style={{ height: 84 }}>
            <AdminHeader signOut={signOut} />
          </Header>
          <Content>{renderRoutes(routers)}</Content>
          <Footer>
            <AdminFooter />
          </Footer>
        </Layout>
      </Layout>
    </AdminWrapper>

  );
};

export default memo(Admin);
