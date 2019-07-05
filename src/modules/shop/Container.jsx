import React from 'react';
import { connect } from 'react-redux';
import { makeCreateSelector } from '@util/reduxUtil';
import Shop from './Shop';
import { getShopList } from './actions';

class Container extends React.PureComponent {
	componentWillMount() {
		const {
			getList,
		} = this.props;
		if (getList) getList();
	}

	render() {
		const {
			shopList,
		} = this.props;
		return <Shop shopList={shopList} />;
	}
}

const filterShopList = makeCreateSelector(['shopList'], shopList => (shopList && shopList.records ? shopList.records : []));

const mapStateToProps = state => ({
	shopList: filterShopList(state.modules.shop),
});

export default connect(mapStateToProps, dispatch => ({
	getList() {
		dispatch(getShopList());
	},
}))(Container);
