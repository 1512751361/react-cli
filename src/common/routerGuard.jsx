/**
 * 路由拦截器
 * 1. 登录授权，用户没有登录只能访问登录页面，如果处于登录状态则跳转到当前用户的默认首页
 * 2. 路由授权，当前登录用户的角色，如果对一个 URL 没有权限访问，则会呈现403
 *  */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import loadable from '@loadable/component';
import { makeCreateSelector } from '@util/reduxUtil';
import checkPermission from '@util/permissionUtil';

class RouterGuard extends Component {
	constructor(props) {
		super(props);
		this.isAuthLogin = this.isAuthLogin.bind(this);
		this.isAuthRoles = this.isAuthRoles.bind(this);
	}

	componentWillMount() {
		const {
			history: { replace },
		} = this.props;
		if (!this.isAuthLogin()) {
			replace('/login');
			return;
		}
		if (!this.isAuthRoles()) {
			replace('/401');
			return;
		}
		console.log('路由跳转前的拦截', this.props);
	}

	isAuthLogin = () => {
		const {
			authorization,
			meta,
		} = this.props;
		if (meta && meta.auth) {
			if (authorization) {
				return true;
			}
			return false;
		}
		return true;
	}

	isAuthRoles = () => {
		const {
			meta,
			permissions,
		} = this.props;
		if (meta && meta.roles) {
			if (Object.prototype.toString.call(meta.roles) === '[object String]' || Object.prototype.toString.call(meta.roles) === '[object Array]') {
				return checkPermission(meta.roles, permissions);
			}
			return false;
		}
		return true;
	}

	LoadableComponent = () => {
		const { component } = this.props;
		console.log(Object.prototype.toString.call(component), component);
		if (React.isValidElement(component)) {
			return component;
		} if (Object.prototype.toString.call(component) === '[object String]') {
			return loadable(() => import(`../modules/${component}`));
		} if (Object.prototype.toString.call(component) === '[object Function]') {
			return component;
		}
		return <div />;
	}

	render() {
		const LoadableComponent = this.LoadableComponent();
		return (
			<div>
				<LoadableComponent {...this.props} />
			</div>
		);
	}
}
const filterPermissions = makeCreateSelector(['permissions', 'authorization'], permissions => (permissions || []));
const filterAuthorization = makeCreateSelector(['authorization'], authorization => authorization);
const mapStateToProps = state => ({
	permissions: filterPermissions(state.common),
	authorization: filterAuthorization(state.common),
});

export default withRouter(connect(mapStateToProps)(RouterGuard));
