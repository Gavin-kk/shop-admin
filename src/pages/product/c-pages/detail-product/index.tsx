import { RouteConfigComponentProps } from 'react-router-config';
import React, {
  FC, ReactElement, memo, useEffect,
} from 'react';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Breadcrumbs from '@components/breadcrumbs';

interface Params {
    id:string
}

const DetailProduct: FC<RouteConfigComponentProps<Params>> = (props:RouteConfigComponentProps<Params>): ReactElement => {
  useEffect(() => {
    console.log(props.match.params.id);
  }, []);
  return (
    <Card
      title={<Breadcrumbs />}
      extra={<Button type="primary" icon={<PlusOutlined />}>添加</Button>}
      style={{ width: '100%', height: '100%' }}
    >
      <h2>DetailProduct</h2>
    </Card>
  );
};

export default memo(DetailProduct);
