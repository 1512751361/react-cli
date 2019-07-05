import React, { PureComponent } from 'react';
import { BrowserRouter, Switch, Router } from 'react-router-dom';
import { history } from '@util/historyUtil';

import {
	renderRoutes,
} from '@util/routeUtil';

import { rootRoutes } from './method/dynamic-loader';

export const routes = rootRoutes;

export default class Routers extends PureComponent {
	render() {
		return (
			<BrowserRouter>
				<Router history={history}>
					<Switch>
						{renderRoutes(routes)}
					</Switch>
				</Router>
			</BrowserRouter>
		);
	}
}
