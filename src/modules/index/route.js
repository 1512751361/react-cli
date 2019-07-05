import loadable from '@loadable/component';
import Index from './index';
import Nav from './components/Nav';


const Order = loadable(() => import('../order'));
const ServerPage = loadable(() => import('../service'));

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
		component: Order,
	}, {
		path: '/service',
		component: ServerPage,
	}],
};
