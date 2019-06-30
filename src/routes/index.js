import React,{ PureComponent } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import {
  renderRoutes
} from './method'

import Index from '@/pages/index'
import Error404 from '@/pages/404'

import App from '@/redux/components/App'

export const routes = [
  {
    path: '/index',
    component: App
  },
  {
    path: '/404',
    component: Error404
  },
  {
    path: '/',
    component: Index
  },
];

export default class Router extends PureComponent {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          {renderRoutes(routes)}
        </Switch>
      </BrowserRouter>
    )
  }
};
