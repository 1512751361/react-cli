import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
// 引入store
import configureStore from './store';
// 引入路由文件
import Router from './routes';
// 引入全局样式表
import '@/styles/index.scss';
// 创建store
const store = configureStore();

const renderDom = () => {
	ReactDom.render(
		<Provider store={store}>
			<Router />
		</Provider>,
		document.querySelector('#root'),
	);
};

if (module.hot) {
	// enable MHR
	module.hot.accept('./routes', () => renderDom());
}
renderDom();

// import '../test/huge-apps/App';
