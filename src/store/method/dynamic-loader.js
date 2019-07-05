import camelCase from 'lodash/camelCase';

export const importDynamicSagas = () => {
	const modules = [];
	const resolve = require.context('../../modules', true, /\/saga\.js$/);
	resolve.keys().forEach((key) => {
		modules.push(resolve(key).default);
	});
	return modules;
};

export const importDynamicReducers = () => {
	const modules = {};
	const resolve = require.context('../../modules', true, /\/reducer.(js|ts)$/);
	resolve.keys().forEach((key) => {
		const basename = key.substring(key.lastIndexOf('/', key.lastIndexOf('/' - 1)), key.lastIndexOf('/'));
		const reducerName = camelCase(basename);
		modules[reducerName] = resolve(key).default;
	});
	return modules;
};
