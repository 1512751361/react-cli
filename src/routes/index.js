import React, { PureComponent } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import {
	renderRoutes,
	rootRoutes,
} from './method';

console.log(rootRoutes);

export const routes = rootRoutes;

export default class Router extends PureComponent {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					{renderRoutes(rootRoutes)}
				</Switch>
			</BrowserRouter>
		);
	}
}
