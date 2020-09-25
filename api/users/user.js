import {request} from '../../utlis/request.js';

// 获取用户信息
/**
 * @export
 * @param {object} data {
 * 		Token:String
 *		Timer:String | Number
 * } 
 * @return {Promise} 
 */
export function getUserInfo(data) {
	return request('/user/userinfo',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
}

// 获取用户购物车列表
/**
 * @export
 * @param {object} data {
 * 		Token:String
 *		Timer:String | Number
 * }
 * @return {Promise} 
 */
export function shopCartList(data) {
	return request('/user/shopcar',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
}

// 注册
/**
 * @export
 * @param {object} data {
 * 		userName: string
 * 		password: string
 * }
 * @return {Promise} 
 */
export function register(data) {
	return request('/user/register',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
}

// 修改用户信息
/**
 * @export
 * @param {object} data {
 * 		Fields:用户要修改的字段:Object
 * 		Token:当前Token:String
 *		Timer:String:number
 * }
 * @return {Promise} 
 */
export function modifyUser(data) {
	return request('/user/modified',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
}

// 登录
/**
 * @export
 * @param {object} data {
 * 		userName: string
 * 		password: string
 * }
 * @return {Promise} 
 */
export function login(data) {
	return request('/user/login',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
}

// 注销账户
/**
 * @export
 * @param {object} data {
 * 		userName: string
 * 		password: string
 * }
 * @return {Promise} 
 */
export function deleteUser(data) {
	return request('/user/unsubscribe',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
}