import React, {
  FC, ReactElement, memo, MouseEvent,
} from 'react';
import { Breadcrumb } from 'antd';
import adminPageMenuConfig, { MenuType } from '@src/config/admin-page-menu-config';
import { useLocation, NavLink } from 'react-router-dom';
import { deduplication } from '@src/utils/array-deduplication';

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
          if (location.pathname.indexOf((itemx.routerPath as string)) !== -1) {
            titles.push({ title: item.title, path: item.routerPath });
          }
        });
        recursion(item.children);
      }
      if (location.pathname.indexOf((item.routerPath as string)) !== -1) {
        // console.log(item);
        titles.push({ title: item.title, path: item.routerPath });
      }
    });
    recursion(adminPageMenuConfig);
    // 在这里过滤 titles 重复项
    const removeDuplicationTitleKes = deduplication<TitlesType, 'title'>(titles, 'title');
    return titles.filter((currentValue: TitlesType, index:number) => currentValue.title === removeDuplicationTitleKes[index]);
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
