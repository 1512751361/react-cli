import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
// 引入store
import configureStore from './redux/store';
// 引入路由文件
import Router from './routes';
// 引入全局样式表
// import '@/styles/index.scss';
// 创建store
const store = configureStore();

const renderDom = (): void => {
  ReactDom.render(
    <Provider store={store}>
      <Router />
    </Provider>,
    window.document.querySelector('#root'),
  );
};

if (module) {
  // enable MHR
  if (module.hot) {
    module.hot.accept('./routes', () => renderDom());
  }
}
renderDom();
