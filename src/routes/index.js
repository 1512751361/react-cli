import React,{ PureComponent } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import {
  renderRoutes
} from './method'

import Index from '@/pages/index'
import Error404 from '@/pages/404'

const routes = [
  {
    path: '/',
    exact: true,
    component: Index
  },
  {
    path: '/404',
    component: Error404
  }
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
