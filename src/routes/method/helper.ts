import React from 'react';
import loadable from '@loadable/component';
import {
  ComponentBuildOptions,
  CheckRouteRolesBuildOptions,
  CheckRouteRolesResultBuildOptions,
} from '../typing';
import checkPermission from './permission';

/**
 * @description 检查当前路由权限
 * @param {CheckRouteRolesBuildOptions} props 相关参数
 * @returns {CheckRouteRolesResultBuildOptions} 返回判断结果
 */
export const checkRouteRoles = (
  props: CheckRouteRolesBuildOptions,
): CheckRouteRolesResultBuildOptions => {
  const {
    rolePath, roles, authPath, authorization, meta, route,
  } = props;
  const result = { isAuth: false, isRole: false };

  if (!meta) {
    return result;
  }
  result.isAuth = !!((meta.auth || meta.roles) && !authorization && route.path !== authPath);
  result.isRole = !!(meta.roles && !checkPermission(meta.roles, roles) && route.path !== rolePath);
  return result;
};

/**
 * @description loadableComponent 动态加载资源
 * @param {string} component 需加载的组件路径
 * @param {string} dir 加载组件跟路径
 * @returns {Function} 返回组件或loadable动态组件
 */
export const loadableComponent = (
  component: ComponentBuildOptions,
  dir = 'page/',
): React.ComponentType<any> => {
  if (typeof component === 'string') {
    return loadable(() => import(`../../${dir}${component}`));
  }
  return component;
};
