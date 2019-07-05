import { connect } from 'react-redux';
import { makeCreateSelector } from '@util/reduxUtil';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = makeCreateSelector(['visibilityFilter', 'todos'],
	(visibilityFilter, todos) => {
		console.log('=========');
		console.log(visibilityFilter);
		console.log(todos);
		switch (visibilityFilter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_COMPLETED':
			return todos.filter(t => t.completed);
		case 'SHOW_ACTIVE':
			return todos.filter(t => !t.completed);
		default:
			return todos;
		}
	});

const mapStateToProps = state => ({
	todos: getVisibleTodos(state.modules.index),
	count: state.modules.index.count,
});

const mapDispatchToProps = dispatch => ({
	onTodoClick: (id) => {
		dispatch(toggleTodo(id));
	},
});

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TodoList);

export default VisibleTodoList;
