import _ from 'lodash';

export const importDynamicSagas = () => {
	const modules = [];
	const resolve = require.context('../../pages', true, /\/saga\.js$/);
	resolve.keys().forEach((key) => {
		modules.push(resolve(key).default);
	});
	return modules;
};

export const importDynamicReducers = () => {
	const modules = {};
	const resolve = require.context('../../pages', true, /\/reducer.(js|ts)$/);
	resolve.keys().forEach((key) => {
		const basename = key.substring(key.lastIndexOf('/', key.lastIndexOf('/' - 1)), key.lastIndexOf('/'));
		const reducerName = _.camelCase(basename);
		modules[reducerName] = resolve(key).default;
	});
	return modules;
};
