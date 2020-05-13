import React, { useState } from 'react';

const Count = (): JSX.Element => {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <p>
        You clicked
        {' '}
        {count}
        {' '}
        times
      </p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

export default Count;
