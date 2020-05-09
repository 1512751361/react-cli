import * as history from 'history';
import { HistoryUtil, historyUtil } from '@util/history';
import { ETypeBuildOptions } from '@src/util/history/typings';

jest.mock('history');

describe('test util history', () => {
  it('historyUtil to be instanceOf HistoryUtil',()=>{
    // 使用 .toBeInstanceOf(Class) 检查对象是一个类的实例
    expect(historyUtil).toBeInstanceOf(HistoryUtil);
  });

  it('historyUtil default config createBrowserHistory', () => {
    new HistoryUtil();
    // 调用了模拟函数
    expect(history.createBrowserHistory).toHaveBeenCalled();
    expect(history.createHashHistory).not.toHaveBeenCalled();
    expect(history.createMemoryHistory).not.toHaveBeenCalled();
    // 模拟函数被调用的准确次数
    expect(history.createBrowserHistory).toHaveBeenCalledTimes(2);
  });

  it('historyUtil history toEqual createBrowserHistory',()=>{
    expect(history.createBrowserHistory()).toEqual(historyUtil.history)
  });
  
  it('history default config createHashHistory', () => {
    const config = { type: ETypeBuildOptions.HASH };
    const historyUtil = new HistoryUtil(config);
    // 模拟函数被调用的准确次数
    expect(history.createHashHistory).toHaveBeenCalled();
    expect(history.createBrowserHistory).toHaveBeenCalledTimes(1);
    expect(history.createMemoryHistory).not.toHaveBeenCalled();
    expect(history.createHashHistory).toHaveBeenCalledTimes(1);
    expect(history.createHashHistory).toHaveBeenCalledWith(config);
    historyUtil.initHistory(config);
    expect(history.createHashHistory).toHaveBeenCalledTimes(2);
    // 模拟函数被调用的具体参数
    expect(history.createHashHistory).toHaveBeenCalledWith(config);
  });

  it('historyUtil history toEqual createHashHistory',()=>{
    const config = { type: ETypeBuildOptions.HASH };
    const historyUtil = new HistoryUtil(config);
    expect(history.createHashHistory()).toEqual(historyUtil.history)
  });

  it('history default config createMemoryHistory', () => {
    const config = { type: ETypeBuildOptions.MEMORY };
    const historyUtil = new HistoryUtil(config);
    // 模拟函数被调用的准确次数
    expect(history.createMemoryHistory).toHaveBeenCalled();
    expect(history.createBrowserHistory).toHaveBeenCalledTimes(1);
    expect(history.createHashHistory).not.toHaveBeenCalled();
    expect(history.createMemoryHistory).toHaveBeenCalledTimes(1);
    expect(history.createMemoryHistory).toHaveBeenCalledWith(config);
    historyUtil.initHistory(config);
    expect(history.createMemoryHistory).toHaveBeenCalledTimes(2);
    // 模拟函数被调用的具体参数
    expect(history.createMemoryHistory).toHaveBeenCalledWith(config);
  });

  it('historyUtil history toEqual createMemoryHistory',()=>{
    const config = { type: ETypeBuildOptions.MEMORY };
    const historyUtil = new HistoryUtil(config);
    expect(history.createMemoryHistory()).toEqual(historyUtil.history)
  });
});
