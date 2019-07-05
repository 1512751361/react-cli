import React from 'react';
import { Link } from 'react-router-dom';

export default class Shop extends React.PureComponent {
	constructor(props) {
		super(props);
		this.renderList = this.renderList.bind(this);
	}

	renderList() {
		const { shopList } = this.props;
		console.log(shopList);
		if (shopList) {
			return shopList.map((item, index) => {
				if (item) {
					return <li key={index}>{item.title}</li>;
				}
				return null;
			});
		}
		return null;
	}

	render() {
		return (
			<div>
				<ul>{this.renderList()}</ul>
				<hr />
				<Link to="/">Home</Link>
			</div>
		);
	}
}
