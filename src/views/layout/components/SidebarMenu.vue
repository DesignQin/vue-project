<template>
	<el-col :span="3">
		<el-menu default-active="5" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#fff" text-color="#333" active-text-color="#2196f3">
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>隐患整改</span>
				</template>
				<el-menu-item-group>
					<template slot="title">
						隐患整改
					</template>
					<el-menu-item index="1-1" @click="handelSelect('/danger/list')">隐患台账</el-menu-item>
					<el-menu-item index="1-2" @click="handelSelect('/danger/department')">部门隐患台账</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item index="2" @click="handelSelect('/task/index')">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>我的任务</span>
				</template>
			</el-menu-item>
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>消防管理</span>
				</template>
				<el-menu-item-group>
					<template slot="title">
						<span>消防管理</span>
					</template>
					<el-menu-item index="3-1" @click="handelSelect('/fire/template')">检查模板</el-menu-item>
					<el-menu-item index="3-2" @click="handelSelect('/fire/record')">检查记录</el-menu-item>
					<el-menu-item index="3-3" @click="handelSelect('/fire/point')">消防点位</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item index="4" disabled>
				<i class="el-icon-document"></i>
				<span slot="title">安全检查</span>
			</el-menu-item>
			<el-menu-item index="5" @click="handelSelect('/kanban/index')">
				<i class="el-icon-document"></i>
				<span slot="title">管理层看板</span>
			</el-menu-item>
			<el-menu-item index="6" @click="handelSelect('/login/index')">
				<i class="el-icon-document"></i>
				<span slot="title">登录</span>
			</el-menu-item>
		</el-menu>
	</el-col>
</template>

<script>
export default {
	name: 'sidebarMenu',
	data(){
		return{
			url:"/kanban/index"
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		handelSelect(url) {
			if(this.url === url)return;
			this.url =url;
			this.$router.push({ path: url });
		}
	}
};
</script>

<style>
.el-menu-vertical-demo {
	min-height: 600px;
}
</style>
