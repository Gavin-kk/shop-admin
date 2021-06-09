import {
  Card, Input, Space,
} from 'antd';
import React, { memo, FC } from 'react';
import { useDispatch } from 'react-redux';
import GTable from './components/g-table';
import { searchOrderAction } from './store/actions-creators';

const { Search } = Input;

const Order: FC = () => {
  const dispatch = useDispatch();
  const onSearch = (value:string) => {
    dispatch(searchOrderAction(value));
  };

  return (
    <Card title={(
      <Space direction="vertical">
        <Search placeholder="请输入订单编号" onSearch={onSearch} style={{ width: 400 }} />
      </Space>
    )}
    >
      <GTable />
    </Card>
  );
};

export default memo(Order);
