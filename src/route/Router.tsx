import React from 'react';
import { BrowserRouter, Switch, Router } from 'react-router-dom';
import { history } from './history';
import { renderRoutes } from './RouteWithSubRoutes';
import { RouteOptions } from './typing';

interface Props {
  routes: RouteOptions[];
}
/**
 * @description 路由配置
 * @returns {React.ReactNode} 路由配置
 */
export default ({ routes }: Props): JSX.Element => {
  return (
    <BrowserRouter>
      <Router history={history}>
        <Switch>{renderRoutes(routes)}</Switch>
      </Router>
    </BrowserRouter>
  );
};
