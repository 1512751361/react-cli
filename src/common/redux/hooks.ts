import { useState, useEffect } from 'react';
import { useDispatch as useDispatch2, useSelector as useSelector2 } from 'react-redux';
import { namespace as CommonNamespace, PROMISE_DISPATCH, SPIN_WRAPPER } from '@src/actions/app';
import {
  ReduxComponentTDispatchProps,
  ReduxComponentTStateProps,
  UsePromiseOptions,
  UsePromiseResult,
  UseSpinWrapperOptions,
  UseSpinWrapperResult,
} from './typings';

export { useStore } from 'react-redux';

export const useDispatch = useDispatch2;

export const useSelector = useSelector2;

export const useSpinWrapper = function<T> (
  type: string,
  payload?: T,
  options?: UseSpinWrapperOptions,
): UseSpinWrapperResult<T> {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state[CommonNamespace]?.spinLoading);
  const spinWrapper = (param?: T): any => dispatch({
    type: `${CommonNamespace}/${SPIN_WRAPPER}`,
    payload: {
      type,
      param: { ...payload || {}, ...param || {} },
    },
  });

  useEffect(() => {
    if (!options?.manual) {
      spinWrapper(payload);
    }
  }, [JSON.stringify(payload)]);

  return { loading, run: spinWrapper };
};

export const usePromise = function<T> (
  type: string,
  payload?: T,
  options?: UsePromiseOptions,
): UsePromiseResult<T> {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const promiseDispatch = (param?: T): Promise<any> => new Promise((resolve, reject) => {
    dispatch({
      type: `${CommonNamespace}/${PROMISE_DISPATCH}`,
      payload: {
        type,
        param: { ...payload || {}, ...param || {} },
        resolve,
        reject,
      },
    });
  });
  const run = async (param?: T): Promise<void> => {
    try {
      setLoading(true);
      await promiseDispatch(param);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!options?.manual) {
      run(payload);
    }
  }, [JSON.stringify(payload)]);
  return { loading, run, promiseDispatch };
};

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

export const useReduxSelector = function<TState, TSelected> (
  namespace: string,
  selector?: (res: TState & ReduxComponentTStateProps, state: any) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
): TSelected & ReduxComponentTStateProps {
  return useSelector<any, TSelected>((state) => {
    const res = {
      spinLoading: state[CommonNamespace].spinLoading,
      ...state[namespace],
    };

    if (selector) {
      return selector(res, state);
    }
    return res;
  }, equalityFn);
};
