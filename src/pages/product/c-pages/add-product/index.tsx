import React, { FC, ReactElement, memo } from 'react';
import Breadcrumbs from '@components/breadcrumbs';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddProduct: FC = (): ReactElement => (
  <Card
    title={<Breadcrumbs />}
    extra={<Button type="primary" icon={<PlusOutlined />}>添加</Button>}
    style={{ width: '100%', height: '100%' }}
  >
    <h2>DetailProduct</h2>
  </Card>
);

export default memo(AddProduct);
