import React, { ReactElement, lazy } from 'react';
import { Redirect } from 'react-router-dom';

const Login = lazy(() => import('../pages/login'));
const Registered = lazy(() => import('../pages/registered'));

const routers = [
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
  {
    path: '/registered',
    component: Registered,
  },
];

export default routers;
