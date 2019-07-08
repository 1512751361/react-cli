import React, { PureComponent } from 'react';
import { BrowserRouter, Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '@util/historyUtil';
import { makeCreateSelector } from '@util/reduxUtil';
import {
	renderRoutes,
} from '@util/routeUtil';

import { rootRoutes } from './method/dynamic-loader';

export const routes = rootRoutes;

class Routers extends PureComponent {
	render() {
		const {
			authorization,
			permissions,
		} = this.props;
		return (
			<BrowserRouter>
				<Router history={history}>
					<Switch>
						{renderRoutes(routes, authorization, permissions)}
					</Switch>
				</Router>
			</BrowserRouter>
		);
	}
}

const filterPermissions = makeCreateSelector(['permissions', 'authorization'], permissions => (permissions || []));
const filterAuthorization = makeCreateSelector(['authorization'], authorization => authorization);
const mapStateToProps = state => ({
	permissions: filterPermissions(state.common),
	authorization: filterAuthorization(state.common),
});

export default connect(mapStateToProps)(Routers);
