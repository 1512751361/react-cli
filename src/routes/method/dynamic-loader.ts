import { RouteConfigBuildOptions } from '../typing';

/**
 * @description 处理route路由地址
 * @param {RouteConfigBuildOptions[]} routes 旧路由配置
 * @param {string} parentPath 父级路由路径
 * @returns {RouteConfigBuildOptions[]} 返回新路由配置
 */
function formatRoutes(
  routes: RouteConfigBuildOptions[],
  parentPath = '',
): RouteConfigBuildOptions[] {
  if (!(routes instanceof Array)) {
    return routes;
  }
  return routes
    .filter((o) => o)
    .map((route: RouteConfigBuildOptions) => {
      const newRoute = { ...route };
      const { inherit } = route;
      const curentPath = route.path || '';

      newRoute.path = inherit ? parentPath + curentPath : curentPath;
      if (inherit && route.redirect) {
        newRoute.redirect = parentPath + route.redirect;
      }
      if (!(route.childRoutes && route.childRoutes.length)) {
        return route;
      }
      newRoute.childRoutes = formatRoutes(route.childRoutes, route.path);
      return newRoute;
    })
    .sort((a: RouteConfigBuildOptions, b: RouteConfigBuildOptions) => {
      if (a.path === '/' || b.path !== '/') {
        return 1;
      }
      if (a.path !== '/' || b.path === '/') {
        return -1;
      }
      if (a.exact && !b.exact) {
        return -1;
      }
      if (!a.exact && b.exact) {
        return 1;
      }
      return 0;
    });
}

/**
 * @description 动态加载路由
 * @param {string} root 动态加载读取目录
 * @param {RegExp} match 文件正则匹配规则
 * @returns {RouteConfigBuildOptions[]} 获取路由配置集合
 */
export const importDynamicRoutes = (): RouteConfigBuildOptions[] => {
  // context 方法参数 不可使用变量和模版字符控制
  const resolve = require.context('../../page', true, /^\.(\/((?!\/)[\s\S])*)?\/route\.(js|ts)$/);

  console.log(resolve, resolve.keys());
  const routes: RouteConfigBuildOptions[] = resolve
    .keys()
    .reduce((res, key) => res.concat(resolve(key).default), [])
    .filter((o) => o);

  return formatRoutes(routes);
};

/**
 * @description 动态加载路由-路由集合
 * @returns {RouteConfigBuildOptions[]} 获取路由配置集合
 */
export const rootRoutes: RouteConfigBuildOptions[] = importDynamicRoutes();
