import React, {
  FC, ReactElement, memo, useEffect, Suspense,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Layout, message } from 'antd';

import { PageProps } from '@src/common/types/sotre-types/router-component-props-type';

import LocalStorage from '@utils/local-storage-utils';
import { USER_KEY } from '@src/common/constant/auth-constant';
import { changeLoginStateAction, changeUserInfoAction, getUserInfoAction } from '@pages/login/store/actions-creators';

import AdminHeader from '@pages/admin/components/header';
import AdminFooter from '@pages/admin/components/footer';
import LeftNavbar from '@pages/admin/components/left-navbar';
import { renderRoutes, RouteConfig } from 'react-router-config';
import Loading from '@components/loading';
import { RootReducerStateType } from '@src/common/types/sotre-types/root-reducer-state-type';
import { AdminWrapper } from './style';

const {
  Header, Footer, Sider, Content,
} = Layout;

const Admin: FC<PageProps> = (props:PageProps): ReactElement => {
  const dispatch = useDispatch();
  const { whetherToLogIn } = useSelector((state:RootReducerStateType) => ({
    errMsg: state.auth.loginErrMsg,
    whetherToLogIn: state.auth.whetherToLogIn,
  }), shallowEqual);

  useEffect(() => {
    const token = LocalStorage.readPermanentlyStoreData(USER_KEY);
    if (!token) {
      props.history.replace('/login');
    } else {
      dispatch(getUserInfoAction);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!whetherToLogIn) {
      props.history.replace('/login');
    }
  }, [whetherToLogIn]);

  const childRouters:RouteConfig[] | undefined = props.route?.routes;

  return (
    <AdminWrapper>
      <Layout className="layout">
        <Sider>
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
