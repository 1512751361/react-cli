import axios from 'axios';

// 使用由库提供的配置的默认值来创建实例
const service = axios.create({
	// api 请求前缀
	baseURL: '',
	// 超时时间
	timeout: 5000,
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
	// 在发送请求之前做些什么
	console.log('require before');
	console.log(config);
	return config;
}, (error) => {
	// 对请求错误做些什么
	console.log('require error');
	console.console(error);
	return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((response) => {
	// 对响应数据做点什么
	const res = response.data;
	return res;
}, (error) => {
	console.log('require error');
	console.console(error);
	// 对响应错误做点什么
	return Promise.reject(error);
});

export default service;
