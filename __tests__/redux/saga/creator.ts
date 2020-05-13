import makeSagaCreator from '@src/redux/saga/creator';
import * as sagaEffects from 'redux-saga/effects';

jest.mock('redux-saga/effects');

describe('test redux saga makeSagaCreator function',()=>{
  const effects = {
    login: jest.fn()
  };
  const namespace = 'pages/index';

  test('test makeSagaCreator return Function',()=>{
    expect(makeSagaCreator(effects,namespace)).toEqual(expect.any(Function));
  });

  test('test makeSagaCreator fork',()=>{
    const saga = makeSagaCreator(effects,namespace);
    saga();
    expect(sagaEffects.takeEvery).toHaveBeenCalledTimes(0);
    // expect(sagaEffects.fork).toHaveBeenCalledTimes(2);
  });
});