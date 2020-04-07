import Service from '@/utils/Service'
//公共
export function getOffice(data) { // 部门查询
	return Service({
		url: 'common/getOffice',
		method: 'get',
		params: data,
		headers: {
			showLoading: false,
		}
	})
}
export function getBmRy() { // 部门负责人查询
	return Service({
		url: 'common/getBmRy',
		method: 'get',
		headers: {
			showLoading: true,
		}
	})
}
export function findByIdOrName(data) { // 部门负责人搜索查询
	return Service({
		url: 'common/findByIdOrName',
		method: 'post',
		data: data,
		headers: {
			showLoading: true,
		}
	})
}
export function getZg() { // 模板查询,负责人查询
	return Service({
		url: 'yhzgList/getZg',
		method: 'get',
		headers: {
			showLoading: false,
		}
	})
}
