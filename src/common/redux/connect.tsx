import React from 'react';
import { connect } from 'react-redux';
import { namespace as CommonNamespace, PROMISE_DISPATCH, SPIN_WRAPPER } from '@src/actions/app';
import { PageType } from './typings';

/**
 * @description redux 高阶组件
 * @param {string} namespace 命名空间
 * @returns {React.ComponentType<P>} 组件
 */
const reduxComponent = function (namespace: string): Function {
  return function <P> (
    WrappedComponent: React.ComponentType<PageType>,
  ): React.ComponentType<P & PageType> {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const TargetComponent: React.SFC<PageType> = (props: PageType) => (
      <div>
        {props?.spinLoading && 'Loading....'}
        <WrappedComponent {...props} />
      </div>
    );

    TargetComponent.displayName = `Hoc{${displayName}}`;
    return connect(
      (state) => ({
        spinLoading: state[CommonNamespace].spinLoading,
        ...state[namespace],
      }),
      (dispatch) => ({
        dispatch,
        emit<T>(actionType: string, payload: T) {
          dispatch({ type: `${namespace}/${actionType}`, payload });
        },
        spinWrapper<T>(actionType: string, payload: T) {
          dispatch({
            type: `${CommonNamespace}/${SPIN_WRAPPER}`,
            payload: {
              type: `${namespace}/${actionType}`,
              param: payload,
            },
          });
        },
        promiseDispatch<T>(actionType: string, payload: T): Promise<any> {
          return new Promise((resolve, reject) => {
            dispatch({
              type: `${CommonNamespace}/${PROMISE_DISPATCH}`,
              payload: {
                type: `${namespace}/${actionType}`,
                param: payload,
                resolve,
                reject,
              },
            });
          });
        },
      }),
    )(TargetComponent);
  };
};

export default reduxComponent;
