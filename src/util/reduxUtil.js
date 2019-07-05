import { createSelector } from 'reselect';
import {
	put, call, takeLatest, all, select, fork, takeEvery,
} from 'redux-saga/effects';
// Action Creators 生成器
export const makeActionCreator = (type, ...argNames) => (...args) => {
	const action = { type, payload: {} };

	argNames.forEach((arg, index) => {
		action.payload[argNames[index]] = args[index];
	});

	return action;
};
// Reducers 生成器
export const createReducer = (initialState, handlers) => (
	state = initialState,
	action,
) => {
	if (action.type in handlers) {
		return handlers[action.type](state, action);
	}
	return state;
};

// 创建 异步 Action types
export const createRequestTypes = actionType => ({
	REQUEST: `${actionType}_REQUEST`,
	SUCCESS: `${actionType}_SUCCESS`,
	FAILURE: `${actionType}_FAILURE`,
});
// 异步 Action Creators 生成器
export const makeAsyncActionCreator = ({ REQUEST, SUCCESS, FAILURE }) => ({
	request: payload => ({
		type: REQUEST,
		payload,
	}),
	success: payload => ({
		type: SUCCESS,
		payload,
	}),
	failure: payload => ({
		type: FAILURE,
		payload,
	}),
});

// state 计算衍生数据
export const makeCreateSelector = (argNames = [], callback) => {
	const inputSelectors = argNames.map((item) => {
		if (Object.prototype.toString.call(item) === '[object Function]') {
			return item;
		} if (Object.prototype.toString.call(item) === '[object String]') {
			return state => state[item];
		}
		throw new Error('makeCreateSelector参数不是有效的值');
	});
	return createSelector(inputSelectors, callback);
};

// saga Creators 生成器
export const makeSagaCreator = (latest, every) => {
	const newTakeList = [];
	if (Object.prototype.toString.call(latest) === '[object Object]') {
		Object.keys(latest).forEach((key) => {
			newTakeList.push(takeLatest(key, latest[key], { select, put, call }));
		});
	}
	if (Object.prototype.toString.call(every) === '[object Object]') {
		Object.keys(every).forEach((key) => {
			newTakeList.push(takeEvery(key, every[key], { select, put, call }));
		});
	}
	return fork(function* saga() {
		yield all(newTakeList);
	});
};
