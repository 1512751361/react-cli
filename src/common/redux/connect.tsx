import React from 'react';
import { connect } from 'react-redux';
import { namespace as CommonNamespace, PROMISE_DISPATCH, SPIN_WRAPPER } from '@src/actions/app';
import { ReduxComponentPageType, ReduxComponentTStateProps, ReduxComponentTDispatchProps } from './typings';

/**
 * @description redux 高阶组件
 * @param {string} namespace 命名空间
 * @param {TStateProps} mapStateToProps 设置state数据
 * @param {mapDispatchToProps} mapDispatchToProps 设置 dispatch to props
 * @returns {React.ComponentType<P>} 组件
 */
const reduxComponent = function <
  ChildProps = {},
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {}
> (
  namespace: string,
  mapStateToProps?: (curentState: ChildProps, ownProps: TOwnProps, state: any) => TStateProps,
  mapDispatchToProps?: (
    dispatchToProps: ReduxComponentTDispatchProps,
    ownProps: TOwnProps,
  ) => TDispatchProps,
): Function {
  return function (
    WrappedComponent: React.ComponentType<
      ReduxComponentPageType & ChildProps & TStateProps & TDispatchProps & TOwnProps
    >,
  ): React.ComponentType<TOwnProps> {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const TargetComponent: React.ComponentType<
      ReduxComponentPageType & ChildProps & TStateProps & TDispatchProps & TOwnProps
    > = (
      props: ReduxComponentPageType & ChildProps & TStateProps & TDispatchProps & TOwnProps,
    ) => <WrappedComponent {...props} />;

    TargetComponent.displayName = `Hoc{${displayName}}`;
    return connect<
      ReduxComponentTStateProps & ChildProps & TStateProps,
      ReduxComponentTDispatchProps,
      TOwnProps
    >(
      (state, ownProps: TOwnProps) => ({
        spinLoading: state[CommonNamespace].spinLoading,
        ...state[namespace],
        ...mapStateToProps ? mapStateToProps(state[namespace], ownProps, state) : {},
      }),
      (dispatch, ownProps: TOwnProps) => {
        const dispatchToProps = {
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
        };

        return {
          ...dispatchToProps,
          ...mapDispatchToProps ? mapDispatchToProps(dispatchToProps, ownProps) : {},
        };
      },
    )<any>(TargetComponent);
  };
};

export default reduxComponent;
