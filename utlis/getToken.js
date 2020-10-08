import {
	getTokenCode
} from '@/api/users/user.js';

// 获取token是否过期
export function getCode() {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: 'token',
			success: response => {
				getTokenCode(response.data).then(res => {
					resolve({
						code: res[1],
						token: response.data
					});
				}).catch(err => {
					reject(err);
				})
			},
			fail: err => {
				getTokenCode().then(res => {
					resolve({
						code: res[1]
					});
				}).catch(err => {
					reject(err);
				})
			}
		})
	})
}
