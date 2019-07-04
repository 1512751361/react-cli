import React, { PureComponent } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import {
	renderRoutes,
} from '@util/routeUtil';

import { rootRoutes } from './method/dynamic-loader';

export const routes = rootRoutes;

export default class Router extends PureComponent {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					{renderRoutes(routes)}
				</Switch>
			</BrowserRouter>
		);
	}
}
