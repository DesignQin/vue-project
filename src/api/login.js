import Service from '@/utils/Service'
export function applogin(data) { // 隐患区域列表
	return Service({
		url: 'whfile/model/applogin'+data,
		method: 'post',
		headers:{showLoading: true}
	})
}