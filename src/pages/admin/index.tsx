import React, {
  FC, ReactElement, memo, useEffect, Suspense,
} from 'react';
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';

import { PageProps } from '@src/common/types/router-component-props-type';

import { USER_KEY } from '@src/common/constant/auth-constant';
import { getUserInfoAction } from '@pages/login/store/actions-creators';

import AdminHeader from '@pages/admin/components/header';
import LeftNavbar from '@pages/admin/components/left-navbar';
import { renderRoutes, RouteConfig } from 'react-router-config';
import Loading from '@components/loading';
import { Footer } from 'antd/lib/layout/layout';
import { AdminWrapper } from './style';
import AdminFooter from './components/footer';

const {
  Header, Sider, Content,
} = Layout;

const Admin: FC<PageProps> = (props:PageProps): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token:string | null = localStorage.getItem(USER_KEY);
    if (!token) {
      props.history.replace('/login');
    } else {
      dispatch(getUserInfoAction);
    }
  }, [dispatch]);

  const childRouters:RouteConfig[] | undefined = props.route?.routes;

  return (
    <AdminWrapper>
      <Layout>
        <Sider className="layout">
          <LeftNavbar />
        </Sider>
        <Layout>
          <Header style={{ height: 100 }} className="head-parent">
            <AdminHeader />
          </Header>
          <Content className="content">
            <Suspense fallback={<Loading />}>
              {renderRoutes(childRouters)}
            </Suspense>
          </Content>
          <Footer>
            <AdminFooter />
          </Footer>
        </Layout>
      </Layout>
    </AdminWrapper>
  );
};

export default memo(Admin);
