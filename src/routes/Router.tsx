import React from 'react';
import { BrowserRouter, Switch, Router } from 'react-router-dom';
import history from '@util/history';
import { renderRoutes } from './RouteWithSubRoutes';
import { rootRoutes } from './method/dynamic-loader';

/**
 * @description 路由配置
 * @returns {React.ReactNode} 路由配置
 */
const Routers = (): JSX.Element => (
  <BrowserRouter>
    <Router history={history}>
      <Switch>
        {renderRoutes({
          routes: rootRoutes,
        }, rootRoutes)}
      </Switch>
    </Router>
  </BrowserRouter>
);

export default Routers;
