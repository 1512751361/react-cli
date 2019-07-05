import React from 'react';
import { Link } from 'react-router-dom';

export default function ({ loginSubmit }) {
	return (
		<div>
      注册登录
			<hr />
			<button
				type="button"
				onClick={() => {
					loginSubmit({ username: 'huoliu', password: '123456' });
				}}
			>
        登录
			</button>
		</div>
	);
}
