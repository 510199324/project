import url_path from '../api-config.js';
export function request(url, data, method, header) {
	return uni.request({
		method,
		data:data,
		url: url_path['base_url'] + url,
		header
	})
}