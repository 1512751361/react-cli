/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Router from '@src/route';
// 引入store
import configureStore from './redux/store';
// 引入路由文件
// 引入全局样式表
import '@src/styles/reset.less';
import '@src/styles/global.less';

// 创建store
const store = configureStore();

const renderDom = (): void => {
  ReactDom.render(
    <Provider store={store}>
      <Router />
    </Provider>,
    window.document.querySelector('#root')
  );
};

if (module) {
  // enable MHR
  if (module.hot) {
    module.hot.accept('./route', () => renderDom());
  }
}
renderDom();
