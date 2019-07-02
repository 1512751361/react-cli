import React from 'react';
import uuid from 'uuid';
import { Route } from 'react-router-dom';

import { importDynamicRoutes } from './dynamic-loader';

// 路由页面
export const rootRoutes = importDynamicRoutes();

export function renderRoutes(routes) {
	if (routes && Object.prototype.toString.call(routes) === '[object Array]') {
		return routes.map((route) => {
			if (route) {
				const key = uuid.v4();
				return <RouteWithSubRoutes key={key} {...route} />;
			}
		});
	} if (routes && Object.prototype.toString.call(routes) === '[object Object]') {
		const key = uuid.v4();
		return <RouteWithSubRoutes key={key} {...routes} />;
	}
	return null;
}

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteWithSubRoutes = route => (
	<Route
		path={route.path}
		render={(props) => {
			// console.log(props)
			// console.log(route)
			if (route && route.children) {
				return (
					<route.component
						{...props}
						routes={route.children}
						childRoutes={() => renderRoutes(route.routes)}
					/>
				);
			}
			return (
			// pass the sub-routes down to keep nesting
				<route.component {...props} childRoutes={() => null} />
			);
		}}
	/>
);
