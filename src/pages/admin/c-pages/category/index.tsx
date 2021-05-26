import React, {
  FC, ReactElement, useState, memo,
} from 'react';
import { Button, Card, Table } from 'antd';

import { CategoryWrapper } from './style';

const Category: FC = (): ReactElement => {
  const [title, setTitle] = useState<string>('一级分类列表');

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <CategoryWrapper>
      <Card
        title={title}
        extra={<Button type="primary">添加</Button>}
        style={{ width: '100%', height: '100%' }}
      >
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    </CategoryWrapper>
  );
};

export default memo(Category);
