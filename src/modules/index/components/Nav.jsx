import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
	fontWeight: 'bold',
	color: 'red',
};
const style = {
	padding: '10px',
};

export default class Nav extends React.PureComponent {
	render() {
		const { children } = this.props;
		return (
			<div>
				<div>
					<NavLink to="/" exact style={style} activeStyle={activeStyle}>Home</NavLink>
					<NavLink to="/order" style={style} activeStyle={activeStyle}>order</NavLink>
					<NavLink to="/service" style={style} activeStyle={activeStyle}>service</NavLink>
					<NavLink to="/shop" style={style} activeStyle={activeStyle}>shop</NavLink>
					<NavLink to="/404" style={style} activeStyle={activeStyle}>404</NavLink>
				</div>
				<br />
				<div>{children}</div>
			</div>
		);
	}
}
