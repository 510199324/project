import {request} from '@/utlis/request.js';

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
		'Content-type': 'application/x-www-form-urlencoded',
		'sessiontoken': data
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
 *  	email: string
 * 		code: string
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

// 发送邮件验证码
/**
 * @export
 * @param {object} data {
 * 		email: string
 * 		type: register:用于注册   upemali用于修改邮箱
 * }
 * @return {Promise} 
 */
export function sendEmail(data) {
	return request('/email',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
}

// 获取用户uuid
/**
 * @export
 * @param {object} data {
 * 		email: string
 * 		type: forgetpass  
 * 		code: string  验证码  
 * }
 * @return {Promise} 
 */
export function getUid(data) {
	return request('/sms',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
}

// 修改邮箱
/**
 * @export
 * @param {object} data {
 * 		type: string      upemail
 * 		newemail: string  新邮箱
 *  	token：token  string  （header）
 * }
 * @return {Promise} 
 */
export function modifyEmail(data) {
	return request('/user/forgetemail',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
}

// 修改密码
/**
 * @export
 * @param {object} data {
 * 		password: string  旧密码
 * 		newPass : string  新密码
 *  	token：token  string
 * }
 * @return {Promise} 
 */
export function modifyPass(data) {
	return request('/user/forgetpass',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
}

// 忘记密码
/**
 * @export
 * @param {object} data {
 * 		password: string  旧密码
 * 		UUID：string  发邮件获得
 *  	email：用户邮箱：string
 * }
 * @return {Promise} 
 */
export function forgetPassWord(data) {
	return request('/user/forgetpass',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
}

// 获取token是否过
/**
 * @export
 * @param {object} data {
 * 		token:string  用户token
 * }
 * @return {Promise} 
 */
export function getTokenCode(data) {
	return request('/token',{},'POST',{
		'Content-type': 'application/x-www-form-urlencoded',
		'sessiontoken': data
	})
}

// 增加购物车的商品
export function addShop(data, token) {
	return request('/user/add_shopcar',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded',
		'sessiontoken': token
	})
}

// 获取全部购物车裂变
export function getShop(data) {
	return request('/user/all_shopcar',{},'POST',{
		'Content-type': 'application/x-www-form-urlencoded',
		'sessiontoken': data
	})
}

// 更新购物车列表
export function upDateShop(data,token) {
	return request('/user/update_shopcar',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded',
		'sessiontoken': token
	})
}

// 删除购物车商品
export function deleteShop(data, token) {
	return request('/user/delete_shopcar',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded',
		'sessiontoken': token
	})
}