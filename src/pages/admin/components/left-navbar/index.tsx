import React, {
  FC, memo, ReactElement,
} from 'react';
import { Menu } from 'antd';
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
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          Option 3
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </LeftNavBarWrapper>
  );
};

export default memo(LeftNavbar);
