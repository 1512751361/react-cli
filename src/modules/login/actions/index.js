/*
 * action 创建函数
 */
import { makeActionCreator } from '@util/reduxUtil';


/** ============== Actions Contants ============== */
/*
 * action 前缀
 */
const PREFIX = 'LOGIN';
/*
 * action 类型
 */
// 登录
export const LOGIN = `${PREFIX}_LOGIN`;
// 保存登录信息
export const LOGIN_SAVE = `${PREFIX}_LOGIN_SAVE`;

/*
 * 其它的常量
 */


/** ============== Actions 创建函数 ============== */
export const login = makeActionCreator(LOGIN, 'loginInfo');

export const loginSave = makeActionCreator(LOGIN_SAVE, 'loginInfo');
