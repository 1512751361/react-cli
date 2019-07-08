import Index from './index';
import Nav from './components/Nav';

export default {
	path: '/',
	component: Nav,
	isChild: true,
	childRoutes: [{
		exact: true,
		path: '/',
		component: Index,
	}, {
		path: '/order',
		meta: {
			roles: ['order'],
		},
		component: 'order',
	}, {
		path: '/service',
		component: 'service',
		meta: {
			auth: true,
		},
	}],
};
