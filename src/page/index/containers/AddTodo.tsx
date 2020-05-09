import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

interface IProps {
  onAddClick: (text: string) => void;
}

export const AddTodo = ({ onAddClick }: IProps): JSX.Element => {
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

export default connect(undefined, (dispatch: any) => ({
  onAddClick: (text: string) => dispatch(addTodo(text)),
}))(AddTodo);
