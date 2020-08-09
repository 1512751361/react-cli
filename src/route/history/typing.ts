import {
  BrowserHistoryBuildOptions,
  HashHistoryBuildOptions,
  MemoryHistoryBuildOptions
} from 'history';

export enum TypeBuildOptions {
  BROWSER = 'BROWSER',
  HASH = 'HASH',
  MEMORY = 'MEMORY'
}

export type ConfigBuildOptions = {
  type?: TypeBuildOptions;
} & BrowserHistoryBuildOptions &
  HashHistoryBuildOptions &
  MemoryHistoryBuildOptions;
