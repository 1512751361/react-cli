import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick, count }) => (
	<ul>
		{todos.map((todo, index) => (
			<Todo {...todo} onClick={() => onTodoClick(index)} />
		))}
		<li>{count}</li>
	</ul>
);

TodoList.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			completed: PropTypes.bool.isRequired,
			text: PropTypes.string.isRequired,
		}).isRequired,
	).isRequired,
	onTodoClick: PropTypes.func.isRequired,
	count: PropTypes.number.isRequired,
};

export default TodoList;
