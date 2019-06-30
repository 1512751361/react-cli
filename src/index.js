import React from "react";
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import Router from './routes'
import '@/styles/index.scss'

ReactDom.render(
  <Provider store={store()}>
    <Router />
  </Provider>  
,document.querySelector('#root'));
