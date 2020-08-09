/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteOptions } from './typing';
import { loadableComponent } from './helper';

interface RouteWithSubRouteProps {
  route: RouteOptions;
}

const routeWithSubRoute: React.SFC<RouteWithSubRouteProps> = ({ route }) => {
  const { title, component, render, redirect, path, childRoutes, wrappers, ...routeProps } = route;
  let key: string = `${Math.random()}`;

  if (path instanceof Array) {
    key = path.join('-');
  }
  if (typeof path === 'string' && path) {
    key = path;
  }
  return (
    <Route
      {...routeProps}
      path={path === '/404' ? undefined : path}
      key={key}
      render={(props): React.ReactNode => {
        if (redirect) {
          return (
            <Redirect
              to={{
                pathname: redirect,
                state: { from: props.location }
              }}
            />
          );
        }
        if (render) {
          return render(props);
        }
        let children = null;
        if (childRoutes instanceof Array && childRoutes.length) {
          children = renderRoutes(childRoutes);
        }
        if (!component) {
          return children;
        }
        const LoadableCom = loadableComponent(component);
        return (
          <LoadableCom {...props} route={route}>
            {children}
          </LoadableCom>
        );
      }}
    />
  );
};

/**
 * @description 创建路由
 * @param {RouteOptions} routes 路由集合参数
 * @returns {React.ReactNode[] | React.ReactNode} 路由集合
 */
export const renderRoutes = function (routes: RouteOptions[]): React.ReactNode[] | React.ReactNode {
  if (!routes) {
    return null;
  }
  return routes.map((route) => {
    return routeWithSubRoute({ route });
  });
};
