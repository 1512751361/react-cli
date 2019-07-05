import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addTodo, sumCount } from '../actions';

const AddTodo = ({ dispatch }) => {
	let input;
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (!input.value.trim()) {
						return;
					}
					dispatch(addTodo(input.value));
					input.value = '';
				}}
			>
				<input
					ref={(node) => {
						input = node;
					}}
				/>
				<button type="submit">Add Todo</button>
				<button
					type="button"
					onClick={() => {
						dispatch(sumCount());
					}}
				>
					{'Add Count'}
				</button>
			</form>
			<a href="/404">404</a>
			<br />
			<Link to="/404">404-2</Link>
			<br />
			<Link to="/login">Login</Link>
		</div>
	);
};

export default connect()(AddTodo);
