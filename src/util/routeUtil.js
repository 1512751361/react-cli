import React from 'react';
import camelCase from 'lodash/camelCase';
import { Route } from 'react-router-dom';

// 创建路由
export function renderRoutes(routes) {
	if (routes && Object.prototype.toString.call(routes) === '[object Array]') {
		return routes.map((route) => {
			if (route) {
				const { path } = route;
				const key = camelCase(path) || `routes_${parseInt(Math.random() * 100000, 10)}`;
				return <RouteWithSubRoutes key={key} {...route} />;
			}
		});
	} if (routes && Object.prototype.toString.call(routes) === '[object Object]') {
		const { path } = routes;
		const key = camelCase(path) || `routes_${parseInt(Math.random() * 100000, 10)}`;
		return <RouteWithSubRoutes key={key} {...routes} />;
	}
	return null;
}

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export function RouteWithSubRoutes(route) {
	if (!route) {
		return null;
	}
	const {
		childRoutes,
		component,
		isChild,
		...other
	} = route;
	if (childRoutes && childRoutes.length && isChild) {
		if (isChild) {
			return (
				<Route
					{...other}
					render={props => (
						<route.component {...props} parentRoutes={route} childRoutes={childRoutes}>
							{renderRoutes(childRoutes)}
						</route.component>
					)}
				/>
			);
		}
		return (
			<Route
				{...other}
				render={(props) => {
					// console.log(props)
					// console.log(route)
					if (childRoutes) {
						return (
							<route.component
								{...props}
								parentRoutes={route}
								childRoutes={childRoutes}
								renderChildRoutes={() => renderRoutes(childRoutes)}
							/>
						);
					}
					// pass the sub-routes down to keep nesting
					return (
						<route.component {...props} parentRoutes={route} childRoutes={childRoutes} />
					);
				}}
			/>
		);
	}
	return (
		<Route
			{...route}
		/>
	);
}
