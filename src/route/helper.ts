import loadable from '@loadable/component';
import { RouteComponent, LoadableComponentResponse } from './typing';

/**
 * @description loadableComponent 动态加载资源
 * @param {string} component 需加载的组件路径
 * @param {string} dir 加载组件跟路径
 * @returns {Function} 返回组件或loadable动态组件
 */
export const loadableComponent = (component: RouteComponent): LoadableComponentResponse => {
  if (typeof component === 'string') {
    return loadable(() => import(`${__dirname}/../${component}`));
  }
  return component;
};

// export const loadableComponent = (
//   component: ComponentBuildOptions,
//   dir = 'pages/',
// ): React.ComponentType<any> => {
//   if (typeof component === 'string') {
//     return loadable(() => import(`../../${dir}${component}`));
//   }
//   return component;
// };
