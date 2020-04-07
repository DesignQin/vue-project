<template>
	<div>
		<el-row class="tac" v-if="NODE_ENV ==='development'">
			<sidebar-Menu style="width: 205px;height: 100%;"></sidebar-Menu>
			<el-col style="width: calc(100% - 205px);">
				<router-view />
			</el-col>
		</el-row>
		<el-row v-else>
			<router-view />
		</el-row>
		
	</div>
</template>

<script>
import { mapState } from 'vuex';
import SidebarMenu from './components/SidebarMenu.vue';
export default {
	name: 'layout',
	data() {
		return {};
	},
	computed:{	
		...mapState(['NODE_ENV'])
	},
	components: {
		SidebarMenu
	}
};
</script>

<style scoped="scoped">
.tac {
	height: 100%;
	width: 100%;
}
</style>
