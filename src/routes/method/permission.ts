/**
 * @description 检查权限功能
 * @param {string|string[]} value 待检查的权限值
 * @param {Array} roles 所有权限列表
 * @returns {Boolean} 返回待检查权限是否具有权限
 */
export default function checkPermission(value: string | string[], roles: string[] = []): boolean {
  if (value && value instanceof Array) {
    const hasPermission = roles.some((role) => value.includes(role));

    if (!hasPermission) {
      return false;
    }
    return true;
  }
  if (value && typeof value === 'string') {
    return roles.includes(value);
  }
  return false;
}
