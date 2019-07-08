import React from 'react';
import camelCase from 'lodash/camelCase';
import { Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import checkPermission from '@util/permissionUtil';


// LoadableComponent
export function loadableComponent(component) {
	if (Object.prototype.toString.call(component) === '[object String]') {
		return loadable(() => import(`../modules/${component}`));
	}
	return component;
}

// 创建路由
export function renderRoutes(routes, Authorization, roles = [], authPath = '/login', rolePath = '/401', exactProps = {}) {
	if (routes && Object.prototype.toString.call(routes) === '[object Array]') {
		return routes.map((route) => {
			if (route) {
				const { path, key } = route;
				const key2 = camelCase(path) || `routes_${parseInt(Math.random() * 100000, 10)}`;
				return (
					<RouteWithSubRoutes
						{...route}
						key={key || key2}
						Authorization={Authorization}
						authPath={authPath}
						roles={roles}
						rolePath={rolePath}
						exactProps={exactProps}
					/>
				);
			}
		});
	}
	if (routes && Object.prototype.toString.call(routes) === '[object Object]') {
		const { path, key } = routes;
		const key2 = camelCase(path) || `routes_${parseInt(Math.random() * 100000, 10)}`;
		return (
			<RouteWithSubRoutes
				{...routes}
				key={key || key2}
				Authorization={Authorization}
				authPath={authPath}
				roles={roles}
				rolePath={rolePath}
				exactProps={exactProps}
			/>
		);
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
		Authorization,
		authPath,
		roles,
		rolePath,
		exactProps,
		meta,
		...other
	} = route;
	if (childRoutes && childRoutes.length && isChild) {
		if (isChild) {
			return (
				<Route
					{...other}
					render={(props) => {
						if (meta && (meta.auth || meta.roles) && (!Authorization) && route.path !== authPath) {
							// 需要权限页面 且没有权限重定向到登录页面
							return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />;
						}
						if (meta && meta.roles) {
							if ((!checkPermission(meta.roles, roles)) && route.path !== rolePath) {
								// 没有权限
								return (
									<Redirect
										to={{
											pathname: rolePath,
											state: { from: props.location },
										}}
									/>
								);
							}
						}
						if (route.render) {
							route.render({
								...props,
								...exactProps,
								routes: route,
								childRoutes: () => renderRoutes(
									childRoutes, Authorization, roles, authPath, rolePath,
								),
							});
						}
						const LoadableCom = loadableComponent(route.component);
						return (
							<LoadableCom
								{...props}
								{...exactProps}
								routes={route}
								childRoutes={() => renderRoutes(
									childRoutes, Authorization, roles, authPath, rolePath,
								)}
							>
								{renderRoutes(childRoutes, Authorization, roles, authPath, rolePath)}
							</LoadableCom>
						);
					}}
				/>
			);
		}
	}
	return (
		<Route
			{...other}
			render={(props) => {
				// console.log('route:');
				// console.log(route);
				if (meta && (meta.auth || meta.roles) && (!Authorization) && route.path !== authPath) {
					// 需要权限页面 且没有权限重定向到登录页面
					return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />;
				}
				if (meta && meta.roles) {
					if ((!checkPermission(meta.roles, roles)) && route.path !== rolePath) {
						// 没有权限
						return (
							<Redirect
								to={{
									pathname: rolePath,
									state: { from: props.location },
								}}
							/>
						);
					}
				}
				if (route.render) {
					route.render({
						...props,
						...exactProps,
						routes: route,
						childRoutes: () => renderRoutes(
							childRoutes, Authorization, roles, authPath, rolePath,
						),
					});
				}
				const LoadableCom = loadableComponent(route.component);
				return (
					<LoadableCom
						{...props}
						{...exactProps}
						routes={route}
						childRoutes={() => renderRoutes(
							childRoutes, Authorization, roles, authPath, rolePath,
						)}
					/>
				);
			}}
		/>
	);
}
