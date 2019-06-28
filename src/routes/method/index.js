import React from "react";
import uuid from 'uuid';
import { Route } from "react-router-dom";


// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => {
      console.log(props)
      console.log(route)
      if(route&&route.children){
        <route.component {...props} routes={route.children} childRoutes={()=>renderRoutes(route.routes)} />
      }
      return (
        // pass the sub-routes down to keep nesting
        <route.component {...props} childRoutes={()=>null} />
      )
    }}
  />
);

export function renderRoutes(routes) {
  if(routes&&Object.prototype.toString.call(routes)==='[object Array]'){
    return routes.map((route,i)=>{
      if(route) {
        const key = uuid.v4();
        return <RouteWithSubRoutes key={key} {...route} />
      }
    })
  }else if(routes&&Object.prototype.toString.call(routes)==='[object Object]'){
    const key = uuid.v4();
    return <RouteWithSubRoutes key={key} {...routes} /> 
  }
  return null
};