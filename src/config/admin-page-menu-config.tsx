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
}

const adminPageMenuConfig:MenuType[] = [
  {
    title: '首页',
    icon: <HomeOutlined />,
    routerPath: '/admin/home',
  },
  {
    title: '商品',
    icon: <MenuFoldOutlined />,
    children: [
      {
        title: '品类管理',
        icon: <SettingOutlined />,
        routerPath: '/admin/category',
      },
      {
        title: '商品管理',
        icon: <SettingOutlined />,
        routerPath: '/admin/product',
      },
    ],
  },
  {
    title: '用户管理',
    icon: <UserOutlined />,
    routerPath: '/admin/user',
  },
  {
    title: '角色管理',
    icon: <SettingOutlined />,
    routerPath: '/admin/role',
  },
  {
    title: '图形图表',
    icon: <AreaChartOutlined />,
    children: [
      {
        title: '柱形图',
        icon: <BarChartOutlined />,
        routerPath: '/admin/bar',
      },
      {
        title: '折线图',
        icon: <RiseOutlined />,
        routerPath: '/admin/line',
      },
      {
        title: '饼图',
        icon: <PieChartOutlined />,
        routerPath: '/admin/pie',
      },
    ],
  },

];

export default adminPageMenuConfig;
