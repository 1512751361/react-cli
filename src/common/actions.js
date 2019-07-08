/*
 * action 创建函数
 */
import { makeActionCreator } from '@util/reduxUtil';


/** ============== Actions Contants ============== */
/*
 * action 前缀
 */
const PREFIX = 'COMMON';
/*
 * action 类型
 */
// 保存公共模块信息
export const SAVE_COMMON = `${PREFIX}_SAVE_COMMON`;
// 保存登录令牌 authorization
export const SAVE_AUTH = `${PREFIX}_SAVE_AUTH`;
// 获取权限列表信息
export const GET_PERMISSIONLIST = `${PREFIX}_GET_PERMISSIONLIST`;


/*
 * 其它的常量
 */


/** ============== Actions 创建函数 ============== */
// 获取权限列表信息
export const getPermissionList = makeActionCreator(GET_PERMISSIONLIST);
// 保存权限列表信息
export const savePermissionList = makeActionCreator(SAVE_COMMON, 'permissions');
// 保存保存登录令牌 authorization
export const saveAuth = makeActionCreator(SAVE_COMMON, 'authorization');
