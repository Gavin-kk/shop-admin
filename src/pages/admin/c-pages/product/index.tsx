import React, { FC, ReactElement, memo } from 'react';
import { Card } from 'antd';
import Breadcrumbs from '@components/breadcrumbs';

const Product: FC = (): ReactElement => (
  <>
    <Card
      title={<Breadcrumbs />}
      style={{ width: '100%', height: '100%' }}
    />
  </>
);

export default memo(Product);
