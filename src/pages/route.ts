import { RouteConfigBuildOptions } from '@src/routes/typing';

const routes: RouteConfigBuildOptions[] = [
  {
    path: '/',
    component: 'index',
    exact: true,
  },
  {
    path: '/hooks',
    component: 'hooks',
  },
  {
    path: '/404',
    component: '404',
  },
  {
    path: '/403',
    component: '403',
  },
];

export default routes;
