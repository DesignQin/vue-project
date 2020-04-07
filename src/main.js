// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import echarts from 'echarts' //引入echarts
import "@css/index.styl" //全局应用
import "./css/reset.css"; //重置样式
Vue.prototype.$echarts = echarts //引入组件



Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App,
	},
	template: '<App/>'
})
