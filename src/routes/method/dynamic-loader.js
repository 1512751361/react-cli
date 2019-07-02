import _ from 'lodash';

export const importDynamicRoutes = () => {
  const routes = [];
  const resolve = require.context('../../pages',true,/^\.\/([0-9a-zA-Z_]+)$/);
  // console.log(resolve.keys())
  let Index = null;
  resolve.keys().forEach(key => {
    const reducerName = _.camelCase(key);
    if(reducerName==='index'){
      Index = {
        path: '/',
        component: resolve(key).default
      };
    } else {
      routes.push({
        path: `/${reducerName}`,
        component: resolve(key).default
      });
    }
  });
  if(Index){
    routes.push(Index)
  }
  return routes;
}
