 import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		title: '', //导航栏标题
		showTitle: true, // 是否显示导航栏标题
		backShow: false, // 是否显示返回按钮
		userInfo: {}, //用户信息
		NODE_ENV: '', //编译环境

	},
	mutations: {
		NODE_ENV(state, NODE_ENV) { //获取编译环境
			state.NODE_ENV = NODE_ENV;
		},
		userInfo(state, data) { //获取用户信息
			state.userInfo = data;
		},
		showBack(state) { //显示返回按钮
			state.backShow = true;
		},
		hideBack(state) { //隐藏返回按钮
			state.backShow = false;
		},
		showTitle(state) { //显示导航栏标题
			state.showTitle = true;
		},
		hideTitle(state) { //隐藏导航栏标题
			state.showTitle = false;
		},
		title(state, title) { //标题内容
			state.title = title;
		}
	}
})
export default store
