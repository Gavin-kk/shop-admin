import React, {
  FC, memo, ReactElement,
} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Menu } from 'antd';

import adminPageMenuConfig, { MenuType } from '@src/config/admin-page-menu-config';
import { shallowEqual, useSelector } from 'react-redux';
import { IRootReducerStateType } from '@src/common/types/sotre-types/reducer.interface';
import { HomeOutlined } from '@ant-design/icons';
import { LeftNavBarWrapper } from './style';

const { SubMenu } = Menu;

const LeftNavbar: FC = (): ReactElement => {
  const { userInfo } = useSelector((state:IRootReducerStateType) => ({
    userInfo: state.auth.userInfo,
  }), shallowEqual);
  const history = useHistory<History>();

  // const processingMenu = (menuList: MenuType[]) => menuList.map((item) => {
  //   if (item.children && item.title !== '商品管理') {
  //     return (
  //       <SubMenu key={item.title} icon={item.icon} title={item.title}>
  //         {/* 如果存在 children 那么就重新调用一下处理menu 把children传入 */}
  //         { processingMenu(item.children)}
  //       </SubMenu>
  //     );
  //   }
  const processingMenu = (menuList: MenuType[]) => menuList.map((item) => {
    const auth = userInfo!.role.menu.find((itemx) => itemx === item.key);
    if (auth) { // 鉴定权限
      if (item.children && item.title !== '商品管理') {
        return (
          <SubMenu key={item.title} icon={item.icon} title={item.title}>
            {/* 如果存在 children 那么就重新调用一下处理menu 把children传入 */}
            { processingMenu(item.children)}
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
    }
    return null;
  });

  // 判断初始展开哪个菜单
  const expandMenuByDefault = (): string => {
    let title = '';
    adminPageMenuConfig.forEach((item) => {
      if (item.children && item.title !== '商品管理') {
        item.children.forEach((itex) => {
          if (itex.routerPath === history.location.pathname) {
            title = item.title;
          }
        });
      }
    });
    // 处理商品管理中的 add edit 等等路由 让他们一律默认展开商品
    if (history.location.pathname.indexOf('/admin/product') !== -1) {
      title = '商品';
    }
    return title;
  };

  // 判断默认选中哪个菜单项
  const processTheSelectedMenuItem = (): string => {
    const path = history.location.pathname;
    if (path === '/admin/home') {
      return path;
    }
    if (path === '/admin') {
      return `${path}/home`;
    }
    // 处理商品管理中的 add edit 等等路由 让他们一律默认选中 商品管理菜单
    if (path.indexOf('/admin/product') !== -1) {
      return '/admin/product';
    }
    return path;
  };

  return (
    <>
      <LeftNavBarWrapper>
        <NavLink to="/admin" className="text">
          <span>后台管理系统</span>
        </NavLink>
      </LeftNavBarWrapper>
      {/* 菜单 */}
      <Menu
        selectedKeys={[processTheSelectedMenuItem()]}
        // defaultSelectedKeys={[]}
        defaultOpenKeys={[expandMenuByDefault()]}
        mode="inline"
        theme="dark"
      >
        { userInfo && userInfo.role ? processingMenu(adminPageMenuConfig)
          : (
            <Menu.Item key="/admin/home" icon={<HomeOutlined />}>
              <NavLink to="/admin/home">
                首页
              </NavLink>
            </Menu.Item>
          )}
      </Menu>
    </>

  );
};

export default memo(LeftNavbar);
