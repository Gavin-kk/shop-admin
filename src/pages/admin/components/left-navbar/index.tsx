import React, { FC, memo, ReactElement } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Menu } from 'antd';

import adminPageMenuConfig, { MenuType } from '@src/config/admin-page-menu-config';
import { LeftNavBarWrapper } from './style';

const { SubMenu } = Menu;

const LeftNavbar: FC = (): ReactElement => {
  const history = useHistory<History>();

  const processingMenu = (menuList: MenuType[]) => menuList.map((item) => {
    if (item.children) {
      return (
        <SubMenu key={item.title} icon={item.icon} title={item.title}>
          {/* 如果存在 children 那么就重新调用一下处理menu 把children传入 */}
          { processingMenu(item.children) }
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.routerPath} icon={item.icon}>
        <NavLink to={(item.routerPath as string)}>
          {item.title}
        </NavLink>
      </Menu.Item>
    );
  });

  // 判断初始展开哪个菜单
  const expandMenuByDefault = (): string => {
    let title = '';
    adminPageMenuConfig.forEach((item) => {
      if (item.children) {
        item.children.forEach((itex) => {
          if (itex.routerPath === window.location.pathname) {
            title = item.title;
          }
        });
      }
    });
    return title;
  };
    // 判断默认选中哪个菜单项
  const processTheSelectedMenuItem = (): string => {
    const path = history.location.pathname;
    if (path === '/admin') {
      return `${path}/home`;
    }
    return path;
  };

  return (
    <LeftNavBarWrapper>
      <NavLink to="/admin" className="text">
        <span>后台管理系统</span>
      </NavLink>

      {/*  菜单 */}
      <Menu
        defaultSelectedKeys={[processTheSelectedMenuItem()]}
        defaultOpenKeys={[expandMenuByDefault()]}
        mode="inline"
        theme="dark"
      >
        {processingMenu(adminPageMenuConfig)}
      </Menu>
    </LeftNavBarWrapper>
  );
};

export default memo(LeftNavbar);
