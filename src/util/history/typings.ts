import {
  BrowserHistoryBuildOptions,
  HashHistoryBuildOptions,
  MemoryHistoryBuildOptions,
} from 'history';

export enum ETypeBuildOptions {
  BROWSER = 'BROWSER',
  HASH = 'HASH',
  MEMORY = 'MEMORY'
}

export type IConfigBuildOptions = {
  type: ETypeBuildOptions;
} & BrowserHistoryBuildOptions &
  HashHistoryBuildOptions &
  MemoryHistoryBuildOptions;
