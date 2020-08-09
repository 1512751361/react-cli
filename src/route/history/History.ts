import {
  createBrowserHistory,
  History,
  createHashHistory,
  createMemoryHistory,
  MemoryHistory
} from 'history';
import merge from 'lodash/merge';
import { TypeBuildOptions, ConfigBuildOptions } from './typing';

export default class HistoryUtil {
  /**
   * @description history 配置参数
   */
  private config: ConfigBuildOptions = { type: TypeBuildOptions.BROWSER };

  /**
   * @description history 对象
   */
  public history: History | MemoryHistory = createBrowserHistory();

  constructor(opts?: ConfigBuildOptions) {
    this.initHistory(opts);
  }

  /**
   * @description 初始化 history
   * @param {ConfigBuildOptions} config 路由配置参数
   * @returns {void}
   */
  public initHistory(opts?: ConfigBuildOptions): void {
    this.config = merge(this.config, opts);
    const { type } = this.config;

    switch (type) {
      case TypeBuildOptions.MEMORY:
        this.history = createMemoryHistory(this.config);
        break;
      case TypeBuildOptions.HASH:
        this.history = createHashHistory(this.config);
        break;
      default:
        this.history = createBrowserHistory(this.config);
    }
  }
}
