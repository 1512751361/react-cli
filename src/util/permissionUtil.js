/**
 * @param {Array} value 检查权限
 * @param {Array} roles 所有权限
 * @returns {Boolean}
 * @example
 */
export default function checkPermission(value, roles = []) {
	if (value && value instanceof Array && value.length > 0) {
		const permissionRoles = value;
		console.log(roles);
		const hasPermission = roles.some(role => permissionRoles.includes(role));

		if (!hasPermission) {
			return false;
		}
		return true;
	} if (value && typeof (value) === 'string') {
		return roles.indexOf(value) !== -1;
	}
	console.error('need roles!');
	return false;
}
