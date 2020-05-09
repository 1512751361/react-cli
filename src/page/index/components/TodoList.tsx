import React from 'react';
import Todo from './Todo';

interface IProps {
  todos: any[];
  onTodoClick: (id: number) => void;
}

export default function TodoList({ todos, onTodoClick }: IProps): JSX.Element {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
      ))}
    </ul>
  );
}
