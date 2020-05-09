import { importDynamicSagas } from '@src/redux/saga/dynamic-loader';
import sagas from '@src/redux/saga';

jest.mock('@src/redux/saga/dynamic-loader');

describe('test redux saga', () => {
  test('importDynamicReducers Function', () => {
    const saga2 = importDynamicSagas();
    expect(importDynamicSagas).toHaveBeenCalled();
    expect(importDynamicSagas).toHaveBeenCalledTimes(1);
    expect(saga2).toEqual(sagas);
  });
});
