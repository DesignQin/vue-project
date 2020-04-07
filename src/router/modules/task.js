import Layout from '@/views/layout'
const task = {
	path: '/task', //一级路由
	name: 'Task',	//待办任务页面
	component: Layout,
	children: [{		
			path: 'index', //二级路由 
			name: 'taskIndex',
			component: () => import('@/views/taskPage/index'),
		},
		
	]
}
export default task
