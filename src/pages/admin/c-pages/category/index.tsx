import React, {
  FC, memo, ReactElement, useCallback, useEffect, useState, MouseEvent,
} from 'react';
import { Button, Card } from 'antd';

import { useDispatch } from 'react-redux';
import {
  changeCurrentClassifyIdAction,
  getAListOfFirstLevelCategoriesAction,
  getClassifyChildListAction,
} from '@pages/admin/c-pages/category/store/actions-creators';
import SetClassify, { UseMethod } from '@pages/admin/c-pages/category/components/set-classify';
import { FormInstance } from 'antd/es';
import GNTable from '@pages/admin/c-pages/category/components/table';
import Breadcrumbs, { TitlesType } from '@components/breadcrumbs';
import { CategoryWrapper } from './style';

const Category: FC = (): ReactElement => {
  const dispatch = useDispatch();

  // 修改分类弹框中的默认value
  const [categoryNameInitValue, setCategoryNameInitValue] = useState<{ value:string, id:number | null}>({ value: '', id: null });
  // 是否显示添加分类弹框
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // 是否显示修改分类弹框
  const [alterOrAdd, setAlterOrAdd] = useState<UseMethod>(UseMethod.Add);

  // 面包屑添加的数据
  const [breadcrumbsConfig, setBreadcrumbsConfig] = useState<TitlesType[]>([{
    title: '一级分类',
    click(e:MouseEvent<HTMLElement>) {
      e.preventDefault();
      setBreadcrumbsConfig([{
        title: '一级分类',
        click(e:MouseEvent<HTMLElement>) {
          e.preventDefault();
          setBreadcrumbsConfig(breadcrumbsConfig);
          dispatch(getAListOfFirstLevelCategoriesAction);
        },
      }]);
      dispatch(getAListOfFirstLevelCategoriesAction);
    },
  }]);

  // 在列表组件中每次点击查看分类执行的函数
  const setBreadcrumbsConfigCallback = useCallback((id:number, categoryName:string) => {
    // 记录一个当前分类的id
    dispatch(changeCurrentClassifyIdAction(id));
    const n = [...breadcrumbsConfig];
    n.push({
      // title: `${n.length + 1}级分类`,
      title: categoryName,
      // 给每个面包屑 绑定的点击事件
      click(e:MouseEvent<HTMLElement>) {
        e.preventDefault();
        setBreadcrumbsConfig(n);
        dispatch(getClassifyChildListAction(id));
      },
    });
    setBreadcrumbsConfig(n);
  }, [breadcrumbsConfig]);

  useEffect(() => {
    dispatch(getAListOfFirstLevelCategoriesAction);
  }, []);

  // 让添加的分类的弹框显示
  const showModal = useCallback(() => {
    setIsModalVisible(true);
    setAlterOrAdd(UseMethod.Add);
  }, []);
  // 关闭
  const handleCancel = useCallback((empty:()=>void) => {
    empty();// 清空表单
    setIsModalVisible(false);
  }, []);

  const handleOk = useCallback((form:FormInstance<any>) => {
    // 触发表单submit事件
    form.submit();
    // 关闭modal框
    setIsModalVisible(false);
    // 不能直接清除 否则会导致form表单拿不到数据
    setTimeout(() => {
      form.resetFields();// 清除form
    }, 10);
  }, []);

  const editClassifyClick = useCallback((categoryName:string, id:number) => {
    setAlterOrAdd(UseMethod.Alter);
    setIsModalVisible(true);
    setCategoryNameInitValue({ value: categoryName, id });
  }, []);

  return (
    <CategoryWrapper>
      <Card
        title={<Breadcrumbs childrens={breadcrumbsConfig} />}
        extra={<Button type="primary" onClick={showModal}>添加</Button>}
        style={{ width: '100%', height: '100%' }}
      >
        {/* 列表组件 */}
        <GNTable editClassifyClick={editClassifyClick} breadcrumbChange={setBreadcrumbsConfigCallback} />
      </Card>
      {/* 添加用户的弹框 修改用户的弹框 */}
      <SetClassify
        title={alterOrAdd ? '添加分类' : '修改分类'}
        useMethod={alterOrAdd}
        handleCancel={handleCancel}
        handleOk={handleOk}
        show={isModalVisible}
        row={categoryNameInitValue}
      />
    </CategoryWrapper>
  );
};

export default memo(Category);
