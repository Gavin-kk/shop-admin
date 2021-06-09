import React, {
  FC, ReactElement, memo, Suspense,
} from 'react';
import Loading from '@components/loading';
import {
  Button, Popconfirm, Table,
} from 'antd';
import { IProduct } from '@pages/product/typing';
import { offShelfAction, sendNowOnShelfAction } from '@pages/product/store/action-creators';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { deduplication } from '@utils/array-deduplication';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IRootReducerStateType } from '@src/common/types/sotre-types/reducer.interface';
import { useHistory } from 'react-router-dom';
import { StatusButtonWrapper } from './style';

type FiltersType = { text: string, value: string }

const GTable: FC = (): ReactElement => {
  const { productList } = useSelector((state: IRootReducerStateType) => ({
    productList: state.product.productList,
  }), shallowEqual);

  const dispatch = useDispatch();
  const history = useHistory();
  // 请求数据去重
  const filters = (): FiltersType[] => {
    const arr: FiltersType[] = [];
    const newArr = deduplication<IProduct, 'classifyName'>(productList, 'classifyName');
    newArr.forEach((item: string) => {
      arr.push({ text: item, value: item });
    });
    return arr;
  };
  const columns: any = [
    {
      title: '所属分类',
      dataIndex: 'classifyName',
      filters: filters(),
      onFilter: (value: string, record: IProduct) => record.classifyName.indexOf(value) === 0,
    },
    {
      title: '商品名',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      width: 600,
    },
    {
      title: '价格',
      render: (rowData: IProduct): string => `¥ ${rowData.price}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(value: string, rowData: IProduct): ReactElement {
        // 上架
        const nowOnShelf = () => {
          dispatch(sendNowOnShelfAction(rowData.id));
        };
        const offShelf = () => {
          dispatch(offShelfAction(rowData.id));
        };
        return (
          <StatusButtonWrapper>
            {rowData.status === '在售'
              ? <CheckCircleFilled style={{ color: 'rgb(82,196,26)' }} />
              : <CloseCircleFilled style={{ color: 'red' }} />}
            <span className="separate">{ rowData.status }</span>
            <Popconfirm placement="top" title="确认上架吗" onConfirm={nowOnShelf} okText="Yes" cancelText="No">
              <Button
                type="primary"
                size="small"
                className="separate"
                disabled={rowData.status === '在售'}
              >
                上架
              </Button>
            </Popconfirm>
            <Popconfirm placement="top" title="确认下架吗" onConfirm={offShelf} okText="Yes" cancelText="No">
              <Button
                type="primary"
                size="small"
                disabled={rowData.status !== '在售'}
              >
                下架
              </Button>
            </Popconfirm>
          </StatusButtonWrapper>
        );
      },
    },
    {
      title: '操作',
      render(rowData:IProduct): ReactElement {
        const viewProductDetails = () => {
          history.push('/admin/product/detail', rowData.id);
        };
        const modifyTheProduct = () => {
          history.push('/admin/product/edit', rowData.id);
        };

        return (
          <StatusButtonWrapper>
            <Button type="primary" className="separate" size="small" onClick={viewProductDetails}>详情</Button>
            <Button type="primary" size="small" onClick={modifyTheProduct}>修改</Button>
          </StatusButtonWrapper>
        );
      },
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <Table
        columns={columns}
        dataSource={productList}
        rowKey="id"
        pagination={{ defaultPageSize: 9 }}
      />
    </Suspense>
  );
};

export default memo(GTable);
