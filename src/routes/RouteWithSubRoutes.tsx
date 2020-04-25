/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import camelCase from 'lodash/camelCase';
import { RouteComponentProps } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { RouterProps, RouteWithSubRoutesProps, RouteConfigBuildOptions } from './typing';
import { checkRouteRoles, loadableComponent } from './method/helper';

/**
 * @description 加载当前路由和子路由--function组件
 * @param {RouteWithSubRoutesProps} props function组件props参数
 * @returns {JSX.Element} 路由组件
 */
export const RouteWithSubRoutes = function (props: RouteWithSubRoutesProps): JSX.Element {
  const { route, routerProps } = props;
  const { authPath, rolePath } = routerProps;
  const {
    component, path, childRoutes, exactProps, render, isChild, ...other
  } = route;

  return (
    <Route
      {...(other || {})}
      key={path}
      path={path}
      // component={component}
      render={(routeProps: RouteComponentProps<any>) => {
        const isAuthRole = checkRouteRoles({
          ...routerProps,
          meta: route.meta,
          route,
        });

        // 未登录-重置路由
        if (isAuthRole.isAuth) {
          return (
            <Redirect
              to={{
                pathname: authPath,
                state: { from: routeProps.location },
              }}
            />
          );
        }
        // 没有权限-重置路由
        if (isAuthRole.isRole) {
          return (
            <Redirect
              to={{
                pathname: rolePath,
                state: { from: routeProps.location },
              }}
            />
          );
        }

        if (render) {
          return render(route, routerProps);
        }
        const LoadableCom = loadableComponent(component);

        if (isChild && childRoutes && childRoutes instanceof Array) {
          return (
            <LoadableCom
              {...routeProps}
              {...exactProps}
              key={camelCase(path)}
              routeProps={props}
              route={route}
              childRoutes={() => renderRoutes(routerProps, childRoutes)}
            >
              {renderRoutes(routerProps, childRoutes)}
            </LoadableCom>
          );
        }
        return (
          <LoadableCom
            {...routeProps}
            {...exactProps}
            key={camelCase(path)}
            routeProps={props}
            route={route}
            childRoutes={() => renderRoutes(routerProps, childRoutes)}
          />
        );
      }}
    />
  );
};

/**
 * @description 创建路由
 * @param {RouterProps} props 路由集合参数
 * @param {RouteConfigBuildOptions[]} routes 路由配置列表
 * @returns {React.ReactNode[] | React.ReactNode} 路由集合
 */
export const renderRoutes = function (
  props: RouterProps,
  routes?: RouteConfigBuildOptions[],
): React.ReactNode[] | React.ReactNode {
  if (!routes) {
    return null;
  }
  return routes.map((route) => {
    console.log(route);
    return RouteWithSubRoutes({ route, routerProps: props });
    // return (
    //   <RouteWithSubRoutes
    //     key={`route${camelCase(route.path)}`}
    //     route={route}
    //     routerProps={props}
    //   />
    // );
  });
};
