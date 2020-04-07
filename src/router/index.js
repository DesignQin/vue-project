import Vue from 'vue'
import Router from 'vue-router'
import login from './modules/login'
Vue.use(Router)

export default new Router({
	routes: [
		login
	]
})
