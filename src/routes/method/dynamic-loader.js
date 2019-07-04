import compact from 'lodash/compact';

export const importDynamicRoutes = () => {
	const routes = [];
	const resolve = require.context('../../pages', true, /^\.\/([0-9a-zA-Z_]+)$/);
	// console.log(resolve.keys());
	let Index = null;
	resolve.keys().forEach((key) => {
		let newKey = [key.substring(1).toLowerCase()];
		if (/@/.test(newKey)) {
			newKey = compact(key.split('@'));
		}
		const reducerName = newKey[0];
		const path = newKey.join('/:');
		if (reducerName === '/index') {
			Index = {
				path: '/',
				component: resolve(key).default,
			};
		} else {
			routes.push({
				path,
				component: resolve(key).default,
			});
		}
	});
	if (Index) {
		routes.push(Index);
	}
	return routes;
};


export const rootRoutes = importDynamicRoutes();
