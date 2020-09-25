import {request} from '../../utlis/request.js';
export function getGood() {
	return request('',{},'GET')
}