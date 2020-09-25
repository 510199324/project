let url_path = {};
// 开发环境
if (process.env.NODE_ENV === 'development') {
	url_path = {
		'base_url': 'http://www.sngblog.cn:7147'
	}
}
// 生产环境
if (process.env.NODE_ENV === 'production') {
	url_path = {
		'base_url': 'http://www.sngblog.cn:7147'
	}
}
export default url_path