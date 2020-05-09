import { combineReducers } from 'redux';
import { importDynamicReducers } from '@src/redux/reducer/dynamic-loader';
import reducers from '@src/redux/reducer';

jest.mock('redux');
jest.mock('@src/redux/reducer/dynamic-loader');

describe('test createReducer function', () => {
  test('importDynamicReducers Function', () => {
    importDynamicReducers();
    expect(importDynamicReducers).toHaveBeenCalled();
    expect(importDynamicReducers).toHaveBeenCalledTimes(1);
  });

  test('combineReducers Function', () => {
    combineReducers(reducers);
    expect(combineReducers).toHaveBeenCalled();
    expect(combineReducers).toHaveBeenCalledTimes(1);
    expect(combineReducers).toHaveBeenCalledWith(reducers);
  });
});
