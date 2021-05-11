import React, { FC, ReactElement, memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import routers from './router';
import Login from './pages/login';

const App: FC = (): ReactElement => (
  <Login />
  // <BrowserRouter>
  //   {renderRoutes(routers)}
  // </BrowserRouter>
);

export default memo(App);
