import React, {
  FC, ReactElement, memo, Suspense,
} from 'react';
import { renderRoutes } from 'react-router-config';
import { PageProps } from '@src/common/types/router-component-props-type';
import Loading from '@components/loading';

const Product: FC<PageProps> = (props:PageProps): ReactElement => {
  const { route } = props;
  const routers = route?.routes;
  return (
    <Suspense fallback={<Loading />}>
      {renderRoutes(routers)}
    </Suspense>
  );
};

export default memo(Product);
