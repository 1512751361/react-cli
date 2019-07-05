/*
 * action 创建函数
 */
import { makeActionCreator } from '@util/reduxUtil';


/** ============== Actions Contants ============== */
/*
 * action 前缀
 */
const PREFIX = 'SHOP';
/*
 * action 类型
 */
// 获取shop列表信息
export const GET_SHOPLIST = `${PREFIX}_GET_SHOPLIST`;
// 保存shop列表信息
export const SAVE_SHOPLIST = `${PREFIX}_SAVE_SHOPLIST`;


/*
 * 其它的常量
 */


/** ============== Actions 创建函数 ============== */
export const getShopList = makeActionCreator(GET_SHOPLIST);
export const saveShopList = makeActionCreator(SAVE_SHOPLIST, 'shopList');
