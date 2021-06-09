import React, { ReactNode } from 'react';

import {
  HomeOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  RiseOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';

export type MenuType = {
    title:string
    icon:ReactNode | null
    routerPath?:string
    children?:MenuType[]
    key:string
}

const adminPageMenuConfig:MenuType[] = [
  {
    title: '个人中心',
    icon: <HomeOutlined />,
    routerPath: '/admin/home',
    key: '/admin/home',
  },
  {
    title: '商品',
    icon: <MenuFoldOutlined />,
    key: '商品',
    children: [
      {
        title: '品类管理',
        icon: <SettingOutlined />,
        routerPath: '/admin/category',
        key: '/admin/category',
      },
      {
        title: '商品管理',
        icon: <SettingOutlined />,
        routerPath: '/admin/product',
        key: '/admin/product',
        children: [
          {
            title: '添加商品',
            icon: null,
            routerPath: '/admin/product/add',
            key: '/admin/product/add',
          },
          {
            title: '修改商品',
            icon: null,
            routerPath: '/admin/product/edit',
            key: '/admin/product/edit',
          },
          {
            title: '商品详情',
            icon: null,
            routerPath: '/admin/product/detail',
            key: '/admin/product/detail',
          },
        ],
      },
    ],
  },
  {
    title: '订单管理',
    icon: <UserOutlined />,
    routerPath: '/admin/order',
    key: '/admin/order',
  },
  {
    title: '用户管理',
    icon: <UserOutlined />,
    routerPath: '/admin/user',
    key: '/admin/user',
  },
  {
    title: '角色管理',
    icon: <SettingOutlined />,
    routerPath: '/admin/role',
    key: '/admin/role',
  },
  {
    title: '图形图表',
    icon: <AreaChartOutlined />,
    key: '图形图表',
    children: [
      {
        title: '柱状图',
        icon: <BarChartOutlined />,
        routerPath: '/admin/bar',
        key: '/admin/bar',
      },
      {
        title: '堆叠区域图',
        icon: <RiseOutlined />,
        routerPath: '/admin/line',
        key: '/admin/line',
      },
      {
        title: '饼图',
        icon: <PieChartOutlined />,
        routerPath: '/admin/pie',
        key: '/admin/pie',
      },
    ],
  },

];

export default adminPageMenuConfig;
