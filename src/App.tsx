import React, {
  FC, memo, ReactElement, Suspense,
} from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

import './assets/css/global.css';
import Loading from './components/loading';

import routers from './router';

const App: FC = (): ReactElement => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      {renderRoutes(routers)}
    </Suspense>
  </BrowserRouter>
);

export default memo(App);
