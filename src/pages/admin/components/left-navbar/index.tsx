import React, {
  FC, memo, ReactElement,
} from 'react';
import { Menu, Spin } from 'antd';
import {
  AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, PieChartOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { LeftNavBarWrapper } from './style';

const { SubMenu } = Menu;

const LeftNavbar: FC = (): ReactElement => {
  const a = 1;
  return (
    <LeftNavBarWrapper>
      <NavLink to="/admin" className="text">
        <span>后台管理系统</span>
      </NavLink>

      {/*  菜单 */}
      <Menu
        defaultSelectedKeys={['/admin/home']}
        defaultOpenKeys={['商品管理']}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="/admin/home" icon={<PieChartOutlined />}>
          <NavLink to="/admin/home">
            首页
          </NavLink>
        </Menu.Item>
        <SubMenu key="商品管理" icon={<MailOutlined />} title="商品管理">
          <Menu.Item key="/admin/category">
            <NavLink to="/admin/category">
              品类管理
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/admin/product">
            <NavLink to="/admin/product">
              商品管理
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/admin/user" icon={<ContainerOutlined />}>
          <NavLink to="/admin/user">
            用户管理
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/admin/role" icon={<ContainerOutlined />}>
          <NavLink to="/admin/role">
            角色管理
          </NavLink>
        </Menu.Item>
        <SubMenu key="图形图表" icon={<AppstoreOutlined />} title="图形图表">
          <Menu.Item key="/admin/bar">
            <NavLink to="/admin/bar">
              柱形图
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/admin/line">
            <NavLink to="/admin/line">
              折线图
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/admin/pie">
            <NavLink to="/admin/pie">
              饼图
            </NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </LeftNavBarWrapper>
  );
};

export default memo(LeftNavbar);
