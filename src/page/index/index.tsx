import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const hello = 'hello world';
const Index = (props: any): JSX.Element => (
  <div>
    <span>hello world</span>
    <span>{hello}</span>
    <pre>{JSON.stringify(props, null, 4)}</pre>
    <button onClick={() => props.dispatch({ type: 'updateState' })}>onClick</button>
    <button onClick={() => props.dispatch({ type: 'page/index/login' })}>onClick</button>
    <Link to="/404">404</Link>
    <Link to="/403">403</Link>
  </div>
);

export default connect((state) => state['page/index'])(Index);
