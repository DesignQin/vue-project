const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()

	return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

function mergeObject(to, source) {
	var from;
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}
	}

	return to;
}
// 获取 cookie 里的 值
const getCookie = name => {
	var arr,
		reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
	if ((arr = document.cookie.match(reg))) return decodeURI(arr[2]);
	else return null;
}
//寻找数组中的对象 对应的key 的索引
const findElem = function(arrayToSearch, attr, val) {
	for (var i = 0; i < arrayToSearch.length; i++) {
		if (arrayToSearch[i][attr] == val) {
			return i;
		}
	}
	return -1;
}
module.exports = {
	mergeObject: mergeObject,
	formatTime: formatTime,
	formatDate: formatDate,
	getCookie: getCookie,
	findElem: findElem
}
