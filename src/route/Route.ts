import isEmpty from 'lodash/isEmpty';
import { RouteOptions, RouteConfig } from './typing';

type IOpts = RouteConfig;

export default class Route {
  private defaultRoot: string = 'pages';

  private opts: IOpts;

  constructor(opts: IOpts) {
    this.opts = opts;
  }

  get routes(): RouteOptions[] {
    return this.getRoutes(this.opts);
  }

  getRoutes = (opts: IOpts, parentPath: string = ''): RouteOptions[] => {
    const routes = opts?.routes;
    if (isEmpty(routes)) {
      return [];
    }
    return routes
      .reduce<RouteOptions[]>((res, route) => {
        return res.concat(this.patchRoute(opts, route, parentPath));
      }, [])
      .sort((a: RouteOptions, b: RouteOptions) => {
        if (a.path === '/' && b.path !== '/') {
          return -1;
        }
        if (a.path !== '/' && b.path === '/') {
          return 1;
        }
        if (a.path === '/404' && b.path !== '/404') {
          return 1;
        }
        if (a.path !== '/404' && b.path === '/404') {
          return -1;
        }
        return 0;
      });
  };

  private patchRoute = (opts: IOpts, route: RouteOptions, parentPath: string): RouteOptions => {
    const root = opts?.root || this.defaultRoot;
    const childRoutes = route?.childRoutes;
    const path = route?.path;
    const redirect = route?.redirect;
    const component = route?.component;
    const wrappers = route?.wrappers;
    const result: RouteOptions = {};
    const currentPath = `${parentPath}${typeof path === 'string' ? path : ''}`;
    if (parentPath) {
      if (path && typeof path === 'string') {
        result.path = `${parentPath}${path}`;
      }
      if (path && path instanceof Array) {
        result.path = path.map((p) => `${parentPath}${p}`);
      }
      if (redirect) {
        result.redirect = `${parentPath}${redirect}`;
      }
    }
    if (
      component &&
      typeof component === 'string' &&
      !component.startsWith('@/') &&
      !component.startsWith('/')
    ) {
      result.component = `${root}/${component}`;
    }
    if (wrappers) {
      result.wrappers = wrappers.map((wrapper) => {
        if (wrapper.startsWith('@/') || wrapper.startsWith('/')) {
          return wrapper;
        }
        return `${root}/${wrapper}`;
      });
    }
    if (!childRoutes || isEmpty(childRoutes)) {
      return {
        ...route,
        ...result
      };
    }
    return {
      ...route,
      ...result,
      childRoutes: this.getRoutes(
        {
          ...(opts || {}),
          routes: childRoutes
        },
        currentPath
      )
    };
  };
}
