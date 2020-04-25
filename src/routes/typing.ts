import React from 'react';
import { Route } from 'react-router';

export type ComponentBuildOptions = React.ComponentType<any> | string;

export interface MetaBuildOptions {
  // 路由权限列表
  roles?: string[];
  // 路由登录权限
  auth?: boolean;
}

export interface RouteConfigBuildOptions {
  // 路由路径
  path: string;
  redirect?: string;
  // 重定向路由路径
  inherit?: boolean;
  // 路由路径是否继承
  component: ComponentBuildOptions;
  // 路由对应组件
  render?: (
    route: RouteConfigBuildOptions,
    props: RouterProps,
  ) => Route;
  // 路由是否精确匹配
  exact?: boolean;
  // 路由权限配置
  meta?: MetaBuildOptions;
  isChild?: boolean;
  // 子路由
  childRoutes?: RouteConfigBuildOptions[];
  // 其他而外 props
  exactProps?: object;
}

export interface AuthRoleBuildOptions {
  // 令牌
  authorization?: string;
  // 令牌无效重定向路由地址
  authPath?: string;
  // 权限列表
  roles?: string[];
  // 权限无效重定向路由地址
  rolePath?: string;
}

export interface RouterProps extends AuthRoleBuildOptions {
  routes: RouteConfigBuildOptions[];
}

export interface CheckRouteRolesBuildOptions extends AuthRoleBuildOptions {
  meta?: MetaBuildOptions;
  route: RouteConfigBuildOptions;
}

export interface CheckRouteRolesResultBuildOptions {
  isAuth: boolean;
  isRole: boolean;
}

export interface RouteWithSubRoutesProps {
  route: RouteConfigBuildOptions;
  routerProps: RouterProps;
}
