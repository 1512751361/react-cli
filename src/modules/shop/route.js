import loadable from '@loadable/component';

const Container = loadable(() => import('./Container'));

export default {
	path: '/shop',
	component: Container,
};
