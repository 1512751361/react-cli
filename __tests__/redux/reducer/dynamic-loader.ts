import importDynamicReducers from '@src/redux/reducer/dynamic-loader';
import { createReducer } from '@src/redux/reducer/creator';

jest.mock('@src/redux/reducer/creator');

describe('test importDynamicReducers function', () => {
  test('test importDynamicReducers function return value', () => {
    console.log(importDynamicReducers)
    console.log(createReducer)
    // const module = importDynamicReducers();
    // expect(createReducer).toHaveBeenCalled();
    // expect(createReducer).toHaveBeenCalledTimes(2);
    // expect(module['page/index']).toEqual(createReducer);
  });
});
