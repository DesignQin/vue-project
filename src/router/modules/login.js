import Layout from '@/views/layout'
const login = {
	path: '/login', //一级路由
	name: 'Login',
	component: Layout,
	children: [{
			// 隐患总账台账
			path: 'index', //二级路由 /danger/list
			name: 'loginIndex',
			component: () => import('@/views/login/index'),
		},
		
	]
}
export default login
