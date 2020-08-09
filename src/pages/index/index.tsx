import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import reduxComponent from '@src/common/redux/connect';
import { ReduxComponentPageType } from '@src/common/redux/typings';
import App from './components/App';
import { namespace } from './actions';

const hello = 'hello world';
const Index = (props: ReduxComponentPageType): JSX.Element => {
  const ref = useRef<any>();
  useEffect(() => {
    if (props?.spinWrapper) {
      props.spinWrapper('timeout');
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const now = Date.now();
  const [count, setCount] = useState(now);
  useEffect(() => {
    const fn = (): void => {
      ref.current = setTimeout(() => {
        const a = (Date.now() - now) / 1000;
        setCount(parseInt(`${a}`, 10));
        fn();
      }, 1000);
    };

    fn();
    return () => {
      if (ref.current) {
        clearTimeout(ref.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>{count}</h1>
      <App />
      {loading && 'loading button ...'}
      <button
        type='button'
        onClick={async () => {
          setLoading(true);
          try {
            if (props.promiseDispatch) {
              await props.promiseDispatch('timeout');
            }
          } finally {
            setLoading(false);
          }
        }}>
        async
      </button>
      <button
        type='button'
        onClick={() => {
          if (props?.emit) {
            props.emit('login');
          }
        }}>
        Login
      </button>
      <span>hello world</span>
      <span>{hello}</span>
      <pre>{JSON.stringify(props, null, 4)}</pre>
      <button type='button' onClick={() => props.dispatch({ type: 'updateState' })}>
        onClick
      </button>
      <button type='button' onClick={() => props.dispatch({ type: 'pages/index/login' })}>
        onClick
      </button>
      <Link to='/404'>404</Link>
      <Link to='/403'>403</Link>
      <Link to='/hooks'>hooks</Link>
      <Link to='/reduxDemo'>reduxDemo</Link>
    </div>
  );
};

export default reduxComponent(namespace)(Index);
