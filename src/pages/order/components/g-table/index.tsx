import React, {
  memo, FC, useEffect, Fragment,
} from 'react';
import {
  Button, Table, Tag, Popconfirm,
} from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { IRootReducerStateType } from '@src/common/types/sotre-types/reducer.interface';
import { IOrderTable } from '@pages/order/typing';
import moment from 'moment';
import { momentConfig } from '@src/config/moment-config';
import { deleteOrderAction, getOrderTableListAction } from '../../store/actions-creators';

moment.locale('zh-cn', momentConfig);

const GTable: FC = () => {
  const { orderList } = useSelector((state:IRootReducerStateType) => ({
    orderList: state.order.orderList,
  }), shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderTableListAction);
  }, []);

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '订单总金',
      dataIndex: 'orderPrice',
      render(value:string, rowData:IOrderTable) {
        return <Fragment key={value + rowData.orderNumber}>{`￥${value}元`}</Fragment>;
      },
    },
    {
      title: '是否付款',
      dataIndex: 'payStatus',
      render(value: string, rowData:IOrderTable): JSX.Element {
        return <Fragment key={value + rowData.orderNumber}>{value === '0' ? <Tag>未付款</Tag> : <Tag color="#87d068">已付款</Tag>}</Fragment>;
      },
    },
    {
      title: '是否发货',
      dataIndex: 'isSend',
      render(value: string, rowData:IOrderTable): JSX.Element {
        return <Fragment key={value + rowData.orderNumber}>{value}</Fragment>;
      },
    },
    {
      title: '订单创建时间',
      render(rowData:IOrderTable): JSX.Element {
        return (
          <Fragment
            key={rowData.createAt + rowData.orderNumber}
          >
            {moment(moment(rowData.createAt).valueOf() - (1000 * 60 * 60 * 8)).format('llll') }
          </Fragment>
        );
      },
    },
    {
      title: '操作',
      render(rowData:IOrderTable): JSX.Element {
        const remove = () => {
          dispatch(deleteOrderAction(rowData.orderId));
        };
        return (
          <Fragment
            key={rowData.updateAt + rowData.orderNumber}
          >
            <Popconfirm
              title="确定要删除吗"
              onConfirm={remove}
              okText="是"
              cancelText="否"
            >
              <Button
                type="primary"
                size="small"
                danger
              >
                删除
              </Button>
            </Popconfirm>
            ,
          </Fragment>
        );
      },
    },
  ];

  return (
    <>
      <Table dataSource={orderList} columns={columns} rowKey="orderId" />
    </>
  );
};

export default memo(GTable);
