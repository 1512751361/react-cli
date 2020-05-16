import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import App from './components/App';

const hello = 'hello world';
const Index = (props: any): JSX.Element => (
  <div>
    <App />
    <span>hello world</span>
    <span>{hello}</span>
    <pre>{JSON.stringify(props, null, 4)}</pre>
    <button onClick={() => props.dispatch({ type: 'updateState' })}>onClick</button>
    <button onClick={() => props.dispatch({ type: 'pages/index/login' })}>onClick</button>
    <Link to="/404">404</Link>
    <Link to="/403">403</Link>
    <Link to="/hooks">hooks</Link>
    <Link to="/reduxDemo">reduxDemo</Link>
  </div>
);

export default connect((state) => state['pages/index'])(Index);
