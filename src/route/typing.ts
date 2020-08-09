import React from 'react';
import * as H from 'history';
import { RouteComponentProps, RouteChildrenProps } from 'react-router';
import { TypeBuildOptions } from './history/typing';

export type RouteComponent =
  | string
  | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>;

export type LoadableComponentResponse = React.ComponentType<any>;

export interface RouteOptions {
  location?: H.Location;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;

  redirect?: string;
  component?: RouteComponent;
  childRoutes?: RouteOptions[];
  wrappers?: string[];
  title?: string;
}

export interface RouteConfig {
  routes: RouteOptions[];
  root?: string;
  history?: {
    type: TypeBuildOptions;
  };
}
