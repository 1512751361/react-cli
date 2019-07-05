import { makeSagaCreator } from '@util/reduxUtil';
import {
	GET_SHOPLIST,
	saveShopList,
} from './actions';
import * as service from './service';

function* getList({ select, put, call }, { type, payload }) {
	const res = yield call(service.getList);
	if (res && parseInt(res.code, 10) === 1) {
		yield put(saveShopList(res.data));
	}
}

export default makeSagaCreator({
	[GET_SHOPLIST]: getList,
});
