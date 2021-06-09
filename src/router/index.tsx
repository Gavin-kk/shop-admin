import React, { ReactElement, lazy } from 'react';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router-dom';

const Login = lazy(() => import('@pages/login'));
const Admin = lazy(() => import('@pages/admin'));
const Home = lazy(() => import('@pages/home'));
const Category = lazy(() => import('@pages/category'));
const Bar = lazy(() => import('@pages/charts/bar'));
const Pie = lazy(() => import('@pages/charts/pie'));
const Line = lazy(() => import('@pages/charts/line'));
const Role = lazy(() => import('@pages/role'));
const User = lazy(() => import('@pages/user'));
const Product = lazy(() => import('@pages/product'));
const AddProduct = lazy(() => import('@pages/product/c-pages/add-product'));
const HomeProduct = lazy(() => import('@pages/product/c-pages/home-product'));
const EditProduct = lazy(() => import('@pages/product/c-pages/edit-product'));
const DetailProduct = lazy(() => import('@pages/product/c-pages/detail-product'));
const Order = lazy(() => import('@pages/order'));

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
        routes: [
          {
            path: '/admin/product',
            exact: true,
            component: HomeProduct,
          },
          {
            path: '/admin/product/add',
            component: AddProduct,
          },
          {
            path: '/admin/product/edit',
            component: EditProduct,
          },
          {
            path: '/admin/product/detail/',
            component: DetailProduct,
          },
        ],
      },
      {
        path: '/admin/order',
        component: Order,
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
