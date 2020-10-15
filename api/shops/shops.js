import {request} from '../../utlis/request.js';

// 获取商品列表
/**
 * @export
 * @param {object} data {
 * 		id: 根据id获取商品详情
 * }
 * @return {Promise} 
 */
export function getGood(data) {
	return request('/all_product',data,'GET')
}

// 获取type_one商品列表
/**
 * @export
 * @param {object} data {
 * 		id: 根据id获取商品详情
 * }
 * @return {Promise} 
 */
export function getTypeOne(data) {
	return request('/type_one',data,'GET')
}

// 特价或闪购
export function getSpike(type) {
	return request('/spike',{
		type
	},'GET');
}

// 猜你喜欢
export function mayLike() {
	return request('/like',{},'GET');
}