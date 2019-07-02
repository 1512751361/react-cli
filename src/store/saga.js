import { all } from 'redux-saga/effects';


import { importDynamicSagas } from './method/dynamic-loader';

export default function* () {
	yield all([...importDynamicSagas()]);
}
