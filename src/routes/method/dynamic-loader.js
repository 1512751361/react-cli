export const importDynamicRoutes = () => {
	const resolve = require.context('../../modules', true, /^\.\/((?!\/)[\s\S])+\/route\.js$/);
	console.log(resolve.keys());
	const routes = resolve.keys().map(key => resolve(key).default).sort((a, b) => {
		if (a.path === '/' || b.path !== '/') {
			return 1;
		}
		if (a.path !== '/' || b.path === '/') {
			return -1;
		}
		if (a.exact && !b.exact) {
			return -1;
		}
		if (!a.exact && b.exact) {
			return 1;
		}
		return 0;
	});
	console.log(routes);
	return routes;
};


export const rootRoutes = importDynamicRoutes();
