import { all, AllEffect } from 'redux-saga/effects';

import { importDynamicSagas } from './dynamic-loader';

export { default as makeSagaCreator } from './creator';

export default function * (): Iterator<AllEffect<Function>> {
  yield all([...importDynamicSagas()]);
}
