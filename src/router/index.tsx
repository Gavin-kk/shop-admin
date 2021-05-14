import React, { ReactElement, lazy } from 'react';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router-dom';

const Login = lazy(() => import('../pages/login'));

const routers:RouteConfig[] = [
  {
    path: '/',
    exact: true,
    render():ReactElement {
      return <Redirect to="/login" />;
    },
  },
  {
    path: '/login',
    component: Login,
    // routes: [
    //   {
    //     path: '/discovery',
    //     exact: true,
    //     render() {
    //       return <Redirect to="/discovery/recommend" />;
    //     },
    //   },
    // ],
    // components:
  },
];

export default routers;
