import React, { FC, ReactElement, memo } from 'react';
import Breadcrumbs from '@components/breadcrumbs';
import { Card } from 'antd';

const Home: FC = (): ReactElement => (
  <>
    <Card
      title={<Breadcrumbs />}
      style={{ width: '100%', height: '100%' }}
    />
  </>
);

export default memo(Home);
