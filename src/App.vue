<template>
	<div id="app"><router-view /></div>
</template>

<script>
import { getCookie } from '@/utils/util.js';
import { mapState } from 'vuex';
export default {
	name: 'App',
	computed: {
		...mapState(['NODE_ENV'])
	},
	mounted() {
		//console.log(process.env.NODE_ENV);
		this.$store.commit('NODE_ENV', process.env.NODE_ENV);
	},
	methods: {
	}
};
</script>

<style lang="less">
</style>
