import React, { ReactElement, lazy } from 'react';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router-dom';

const Login = lazy(() => import('@pages/login'));
const Admin = lazy(() => import('@pages/admin'));
const Home = lazy(() => import('@pages/admin/c-pages/home'));
const Category = lazy(() => import('@pages/admin/c-pages/category'));
const Bar = lazy(() => import('@pages/admin/c-pages/charts/bar'));
const Pie = lazy(() => import('@pages/admin/c-pages/charts/pie'));
const Line = lazy(() => import('@pages/admin/c-pages/charts/line'));
const Role = lazy(() => import('@pages/admin/c-pages/role'));
const User = lazy(() => import('@pages/admin/c-pages/user'));
const Product = lazy(() => import('@pages/admin/c-pages/product'));

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
  },
  {
    path: '/admin',
    component: Admin,
    routes: [
      {
        path: '/admin',
        exact: true,
        render():ReactElement {
          return <Redirect to="/admin/home" />;
        },
      },
      {
        path: '/admin/home',
        component: Home,
      },
      {
        path: '/admin/category',
        component: Category,
      },
      {
        path: '/admin/bar',
        component: Bar,
      },
      {
        path: '/admin/pie',
        component: Pie,
      },
      {
        path: '/admin/line',
        component: Line,
      },
      {
        path: '/admin/role',
        component: Role,
      },
      {
        path: '/admin/user',
        component: User,
      },
      {
        path: '/admin/product',
        component: Product,
      },
    ],
  },
];

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
export default routers;
