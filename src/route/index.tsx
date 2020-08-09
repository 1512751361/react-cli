import React from 'react';
import config from './config';
import Router from './Router';
import Route from './Route';

const route = new Route(config);

export default (): JSX.Element => <Router routes={route.routes} />;
