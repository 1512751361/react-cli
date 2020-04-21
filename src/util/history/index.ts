import {
  createBrowserHistory,
  History,
  createHashHistory,
  createMemoryHistory,
  MemoryHistory,
} from 'history';
import merge from 'lodash/merge';
import { ETypeBuildOptions, IConfigBuildOptions } from './typings';

export class HistoryUtil {

  /**
   * @description history 配置参数
   */
  private config: IConfigBuildOptions = { type: ETypeBuildOptions.BROWSER };

  /**
   * @description history 对象
   */
  public history: History | MemoryHistory = createBrowserHistory();

  constructor(config?: IConfigBuildOptions) {
    this.initHistory(config);
  }

  /**
   * @description 初始化 history
   * @param {IConfigBuildOptions} config 路由配置参数
   * @returns {void}
   */
  public initHistory(config?: IConfigBuildOptions): void {
    this.config = merge(this.config, config);
    const { type } = this.config;

    switch (type) {
      case ETypeBuildOptions.MEMORY:
        this.history = createMemoryHistory(this.config);
        break;
      case ETypeBuildOptions.HASH:
        this.history = createHashHistory(this.config);
        break;
      default:
        this.history = createBrowserHistory(this.config);
    }
  }
}

export const historyUtil = new HistoryUtil();

export default historyUtil.history;
