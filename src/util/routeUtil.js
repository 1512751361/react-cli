import React from 'react';
import camelCase from 'lodash/camelCase';
import { Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import checkPermission from '@util/permissionUtil';


/**
 * @description LoadableComponent 动态加载资源
 * @param {string} component 需加载的组件路径
 * @param {string} dir 加载组件跟路径
 * @returns {JSX.Element} 返回组件或loadable动态组件
 */
export function loadableComponent(component, dir = 'modules/') {
  if (Object.prototype.toString.call(component) === '[object String]') {
    return loadable(() => import(`../${dir}${component}`));
  }
  return component;
}

/**
 * @description 加载当前路由和子路由--function组件
 * @param {object} route function组件props参数
 * @returns 返回当前路由和自路由集合/方法
 */
export const RouteWithSubRoutes = (route) => {
  if (!route) {
    return null;
  }
  const {
    childRoutes,
    component,
    isChild,
    Authorization,
    authPath,
    roles,
    rolePath,
    exactProps,
    meta,
    ...other
  } = route;
  // 存在子路由配置集合，且需要加载子路由
  if (childRoutes && childRoutes.length && isChild) {
    return (
      <Route
        {...other}
        render={(props) => {
          if (meta && (meta.auth || meta.roles) && (!Authorization) && route.path !== authPath) {
            // 需要权限页面 且没有权限重定向到登录页面
            return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />;
          }
          if (meta && meta.roles) {
            if ((!checkPermission(meta.roles, roles)) && route.path !== rolePath) {
              // 没有权限
              return (
                <Redirect
                  to={{
                    pathname: rolePath,
                    state: { from: props.location },
                  }}
                />
              );
            }
          }
          if (route.render) {
            route.render({
              ...props,
              ...exactProps,
              routes: route,
              childRoutes: () => renderRoutes(
                childRoutes, Authorization, roles, authPath, rolePath,
              ),
            });
          }
          const LoadableCom = loadableComponent(route.component);
          return (
            <LoadableCom
              {...props}
              {...exactProps}
              routes={route}
              childRoutes={() => renderRoutes(
                childRoutes, Authorization, roles, authPath, rolePath,
              )}
            >
              {renderRoutes(childRoutes, Authorization, roles, authPath, rolePath)}
            </LoadableCom>
          );
        }}
      />
    );
  }
  return (
    <Route
      {...other}
      render={(props) => {
        if (meta && (meta.auth || meta.roles) && (!Authorization) && route.path !== authPath) {
          // 未登录-重置路由
          return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />;
        }
        if (meta && meta.roles) {
          if ((!checkPermission(meta.roles, roles)) && route.path !== rolePath) {
            // 没有权限-重置路由
            return (
              <Redirect
                to={{
                  pathname: rolePath,
                  state: { from: props.location },
                }}
              />
            );
          }
        }
        if (route.render) {
          route.render({
            ...props,
            ...exactProps,
            routes: route,
            childRoutes: () => renderRoutes(
              childRoutes, Authorization, roles, authPath, rolePath,
            ),
          });
        }
        const LoadableCom = loadableComponent(route.component);
        return (
          <LoadableCom
            {...props}
            {...exactProps}
            routes={route}
            childRoutes={() => renderRoutes(
              childRoutes, Authorization, roles, authPath, rolePath,
            )}
          />
        );
      }}
    />
  );
};

/**
 * @description 创建路由
 * @param {array|object} routes 动态加载路由
 * @param {string} Authorization 登录令牌--用于判断是否需要登录
 * @param {array} roles 权限集合
 * @param {string} authPath 未登录重置路由路径
 * @param {string} rolePath 无权限重置路由路径
 * @param {object} exactProps route路由其他参数
 * @returns {array} 返回route集合
 */
export function renderRoutes(routes, Authorization, roles = [], authPath = '/login', rolePath = '/401', exactProps = {}) {
  if (routes && Object.prototype.toString.call(routes) === '[object Array]') {
    return routes.map((route) => {
      if (Object.prototype.toString.call(route) === '[object Array]') {
        return renderRoutes(route, Authorization, roles = [], authPath = '/login', rolePath = '/401', exactProps = {});
      } if (route) {
        const { path, key } = route;
        const key2 = camelCase(path) || `routes_${parseInt(Math.random() * 100000, 10)}`;
        return (
          <RouteWithSubRoutes
            {...route}
            key={key || key2}
            Authorization={Authorization}
            authPath={authPath}
            roles={roles}
            rolePath={rolePath}
            exactProps={exactProps}
          />
        );
      }
    });
  }
  if (routes && Object.prototype.toString.call(routes) === '[object Object]') {
    const { path, key } = routes;
    const key2 = camelCase(path) || `routes_${parseInt(Math.random() * 100000, 10)}`;
    return (
      <RouteWithSubRoutes
        {...routes}
        key={key || key2}
        Authorization={Authorization}
        authPath={authPath}
        roles={roles}
        rolePath={rolePath}
        exactProps={exactProps}
      />
    );
  }
  return null;
}
