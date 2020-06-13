import { useDispatch as useDispatch2, useSelector as useSelector2 } from 'react-redux';
import { namespace as CommonNamespace, PROMISE_DISPATCH, SPIN_WRAPPER } from '@src/actions/app';
import { ReduxComponentTDispatchProps, ReduxComponentTStateProps } from './typings';

export { useStore } from 'react-redux';

export const useDispatch = useDispatch2;

export const useSelector = useSelector2;

export const useReduxDispatch = (namespace: string): ReduxComponentTDispatchProps => {
  const dispatch = useDispatch2();
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

  return dispatchToProps;
};

export const useReduxSelector = function<
  TSelected
> (namespace: string): TSelected &ReduxComponentTStateProps {
  return useSelector<any, TSelected & ReduxComponentTStateProps>((state) => ({
    spinLoading: state[CommonNamespace].spinLoading,
    ...state[namespace],
  }));
};
