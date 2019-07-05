import request from '@util/request';

// 获取列表数据
export function login(loginInfo) {
	return request({
		url: '/api/login',
		method: 'post',
		params: loginInfo,
	});
}
