import {request} from '../../utlis/request.js';
// 获取全部地址
/**
 * @export
 * @param {object} data  无参数
 * @return {Promise} 
 */
export function getAddress(data) {
	return request('/all_address',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded',
		'sessiontoken': data
	})
}

// 删除地址
/**
 * @export
 * @param {object} data  index:地址列表的索引
 * @return {Promise} 
 */
export function deleteAddress(data,token) {
	return request('/delete_address',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded',
		'sessiontoken': token
	})
}

// 增加地址
/**
 * @export
 * @param {object} data  {
	 province：省  string
	 city: 市  string
	 area：区 string
	 address：详细地址 string
	 recipients：收件人  string
	 tel：手机号码  string
 }
 * @return {Promise} 
 */
export function addAddress(data,token) {
	return request('/add_address',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded',
		'sessiontoken': token
	})
}

// 修改地址
/**
 * @export
 * @param {object} data  {
	 province：省  string
	 city: 市  string
	 area：区 string
	 address：详细地址 string
	 recipients：收件人  string
	 tel：手机号码  string
 }
 * @return {Promise} 
 */
export function reviseAddress(data,token) {
	return request('/revise_address',data,'POST',{
		'Content-type': 'application/x-www-form-urlencoded',
		'sessiontoken': token
	})
}