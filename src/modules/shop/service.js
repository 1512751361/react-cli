import request from '@util/request';

// 获取列表数据
export function getList() {
	return request({
		url: '/api/getList',
		method: 'get',
	});
}
