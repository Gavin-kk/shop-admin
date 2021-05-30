import React, {
  FC, ReactElement, memo, MouseEvent,
} from 'react';
import { Breadcrumb } from 'antd';
import adminPageMenuConfig, { MenuType } from '@src/config/admin-page-menu-config';
import { useLocation, NavLink } from 'react-router-dom';

interface IProps {
    childrens?:TitlesType[]
}

export type TitlesType = {
    title:string
    path?:string
    click?:(e:MouseEvent<HTMLElement>)=>void
}

const Breadcrumbs: FC<IProps> = (props:IProps): ReactElement => {
  const { childrens } = props;
  const location = useLocation();

  const titleList = ():TitlesType[] => {
    const titles: TitlesType[] = [];
    const recursion = (list:MenuType[]) => list.forEach((item) => {
      if (item.children) {
        item.children.forEach((itemx) => {
          // if (itemx.routerPath === location.pathname) {
          //   titles.push({ title: item.title });
          // }
          if (location.pathname.indexOf((itemx.routerPath as string)) !== -1) {
            titles.push({ title: item.title });
          }
        });
        recursion(item.children);
      }
      if (location.pathname === item.routerPath) {
        titles.push({ title: item.title, path: item.routerPath });
      }
    });
    recursion(adminPageMenuConfig);
    return titles;
  };

  return (
    <Breadcrumb>
      { titleList().map((item) => (
        <Breadcrumb.Item key={item.title}>
          {item.path ? <NavLink to={item.path}>{ item.title }</NavLink> : item.title }
        </Breadcrumb.Item>
      )) }
      {childrens?.map((item) => (
        <Breadcrumb.Item key={item.title}>
          {item.path
            ? <NavLink to={item.path}>{ item.title }</NavLink>
            : (
              <a
                onClick={item.click && item.click}
              >
                {item.title}
              </a>
            ) }
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

Breadcrumbs.defaultProps = {
  childrens: [],
};

export default memo(Breadcrumbs);
