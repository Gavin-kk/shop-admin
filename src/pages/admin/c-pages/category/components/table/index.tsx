import React, {
  FC, ReactElement, memo, Suspense,
} from 'react';
import Loading from '@components/loading';
import {
  Button, Popconfirm, Table,
} from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IRootReducerStateType } from '@src/common/types/sotre-types/root-reducer-state-type';
import { ICategory } from '@pages/admin/c-pages/category/typing';
import { AddButtonNodeWrapper } from './style';
import { deleteClassifyAction, getClassifyChildListAction } from '../../store/actions-creators';

interface IProps{
  editClassifyClick:(categoryName:string, id:number)=>void
  breadcrumbChange:(id:number)=>void
}

const GNTable: FC<IProps> = (props:IProps): ReactElement => {
  const { editClassifyClick, breadcrumbChange } = props;
  const { classifyList } = useSelector((state:IRootReducerStateType) => ({
    classifyList: state.classify.classifyList,
  }), shallowEqual);
  const dispatch = useDispatch();

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'categoryName',
    },
    {
      title: '操作',
      width: 300,
      render(Category:ICategory) {
        const content = '你确定要删除吗,这将删除该分类下所有的分类';
        // 删除分类点击ok执行的函数
        const confirm = () => {
          // 发送删除分类请求
          dispatch(deleteClassifyAction(Category.id));
        };
        // 获取本次点击的分类的子分类
        const getSubcategory = () => {
          // 获取子分类的数据
          dispatch(getClassifyChildListAction(Category.id));
          breadcrumbChange(Category.id);
        };
        return (
          <AddButtonNodeWrapper key={Category.id + Category.categoryName}>
            <Button type="primary" size="small" onClick={() => editClassifyClick(Category.categoryName, Category.id)}>修改分类</Button>
            <Button type="primary" size="small" onClick={getSubcategory}>查看分类</Button>
            <Popconfirm placement="top" title={content} onConfirm={confirm} okText="Yes" cancelText="No">
              <Button type="primary" size="small" danger>删除分类</Button>
            </Popconfirm>
          </AddButtonNodeWrapper>
        );
      },
    },
  ];
  return (
    <Suspense fallback={<Loading />}>
      <Table
        dataSource={classifyList}
        columns={columns}
        bordered
        rowKey="id"
        pagination={{ defaultPageSize: 9 }}
      />
    </Suspense>
  );
};

export default memo(GNTable);
