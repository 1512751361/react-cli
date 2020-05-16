import * as React from 'react';
import { Unsubscribe } from 'redux';
import store from './store';

class Index extends React.PureComponent {
  subscribe?: Unsubscribe;

  componentDidMount(): void {
    this.subscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount(): void {
    if (this.subscribe) {
      this.subscribe();
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <div>{store.getState().num}</div>
        <button type="button" onClick={() => store.dispatch({ type: 'add' })}>加一</button>
        <button type="button" onClick={() => store.dispatch({ type: 'minus' })}>减一</button>
      </div>
    );
  }
}

export default Index;
