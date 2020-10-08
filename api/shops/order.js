import {request} from '../../utlis/request.js';

// 新增订单
export function addOrder(data,token) {
	return request('/add_indent',data,'POST',{
		"Content-type": "application/x-www-form-urlencoded",
		'sessiontoken': token
	})
}

// 支付接口
export function payOrder(data) {
	return request('/pay_indent',data,'POST',{
		"Content-type": 'application/x-www-form-urlencoded'
	})
}

// 确认收货
export function receipt(data) {
	return request('/receipt',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded'
	})
} 