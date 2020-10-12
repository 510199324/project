import {request} from '../../utlis/request.js';
// 新增订单
export function addOrder(data,token) {
	return request('/add_indent',data,'POST',{
		"Content-type": "application/x-www-form-urlencoded",
		'sessiontoken': token
	})
}

// 支付接口
export function payOrder(data,token) {
	return request('/pay_indent',data,'POST',{
		"Content-type": 'application/x-www-form-urlencoded',
		'sessiontoken': token
	})
}

// 确认收货
export function receipt(data) {
	return request('/receipt',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
} 

// 全部订单
export function allOrder(token) {
	return request('/user/all_indent',{},'POST',{
		"Content-type": "application/x-www-form-urlencoded",
		'sessiontoken': token
	})
}

// 待收货
export function received(token) {
	return request('/user/received',{},'POST',{
		"Content-type": "application/x-www-form-urlencoded",
		'sessiontoken': token
	})
} 

// 待付款
export function unpaid(token) {
	return request('/user/unpaid',{},'POST',{
		"Content-type": "application/x-www-form-urlencoded",
		'sessiontoken': token
	})
}

// 待发货
export function delivered(token) {
	return request('/user/delivered',{},'POST',{
		"Content-type": "application/x-www-form-urlencoded",
		'sessiontoken': token
	})
}