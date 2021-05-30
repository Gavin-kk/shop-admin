import React, {
  FC, memo, ReactElement, useCallback, useEffect, useState, MouseEvent,
} from 'react';
import { Button, Card } from 'antd';

import { useDispatch } from 'react-redux';
import {
  changeCurrentClassifyIdAction,
  getAListOfFirstLevelCategoriesAction,
  getClassifyChildListAction,
} from '@pages/category/store/actions-creators';
import ClassifyForm, { UseMethod } from '@pages/category/components/classify-form';
import { FormInstance } from 'antd/es';
import GNTable from '@pages/category/components/table';
import Breadcrumbs, { TitlesType } from '@components/breadcrumbs';
import { PlusOutlined } from '@ant-design/icons';
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
      // 如果点击了 一级分类面包屑 那就把 currentId 设置为 null
      dispatch(changeCurrentClassifyIdAction(null));
      // 点击一级分类面包屑 就重新获取一级分类数据
      dispatch(getAListOfFirstLevelCategoriesAction);

      // 每次点击1级分类就把他覆盖为初始的只有一条数据的 breadcrumbsConfig
      setBreadcrumbsConfig([{
        title: '一级分类',
        click(e:MouseEvent<HTMLElement>) {
          e.preventDefault();
          setBreadcrumbsConfig(breadcrumbsConfig);
          dispatch(getAListOfFirstLevelCategoriesAction);
        },
      }]);
    },
  }]);

  // 在列表组件中每次点击查看分类执行的函数
  const setBreadcrumbsConfigCallback = useCallback((id:number, categoryName:string) => {
    // 记录一个当前分类的id
    dispatch(changeCurrentClassifyIdAction(id));
    const n = [...breadcrumbsConfig];
    n.push({
      title: categoryName,
      // 给每个面包屑 绑定的点击事件
      click(e:MouseEvent<HTMLElement>) {
        e.preventDefault();
        setBreadcrumbsConfig(n);
        dispatch(changeCurrentClassifyIdAction(id));
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
    form.validateFields(['categoryName']).then(() => {
      // 触发表单submit事件
      form.submit();
      // 关闭modal框
      setIsModalVisible(false);
      // 不能直接清除 否则会导致form表单拿不到数据 并且错误提示也会被清除
      setTimeout(() => {
        form.resetFields();// 清除form
      }, 10);
    });
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
        extra={<Button type="primary" onClick={showModal} icon={<PlusOutlined />}>添加</Button>}
        style={{ width: '100%', height: '100%' }}
      >
        {/* 列表组件 */}
        <GNTable editClassifyClick={editClassifyClick} breadcrumbChange={setBreadcrumbsConfigCallback} />
      </Card>
      {/* 添加用户的弹框 修改用户的弹框 */}
      <ClassifyForm
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
