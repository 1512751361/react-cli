import { historyPush } from '@util/historyUtil';
import { makeSagaCreator } from '@util/reduxUtil';

import { LOGIN, loginSave } from './actions';
import { saveAuth, savePermissionList } from '@/common/actions';
import * as service from './service';

function* loginSubmit({ select, put, call }, { type, payload }) {
	console.log(payload);
	const { loginInfo } = payload;
	const res = yield call(service.login, loginInfo);
	console.log(res);
	if (res && parseInt(res.code, 10) === 200) {
		yield put(saveAuth(res.data.token));
		yield put(savePermissionList(res.data.roles));
		yield put(loginSave(res.data.userInfo));
		yield call(historyPush, '/');
	}
}

export default makeSagaCreator({
	[LOGIN]: loginSubmit,
});
