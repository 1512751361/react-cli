import React from 'react';
import reduxComponent from '@src/common/redux/connect';
import { namespace, ADD_TODO } from '../actions';

interface IProps {
  onAddClick: (text: string) => void;
}

const AddTodo = ({ onAddClick }: IProps): JSX.Element => {
  let input: any = null;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          onAddClick(input.value);
          input.value = '';
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default reduxComponent<{}, {}, IProps>(namespace, () => ({}), ({ emit }) => ({
  onAddClick: (text: string) => emit(ADD_TODO, { id: Math.floor(Math.random() * 10000), text }),
}))(AddTodo);
