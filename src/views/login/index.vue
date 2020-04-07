<template>
	<el-row class="app_container">
		<el-row class="body">
			<el-form ref="form" :model="form" label-width="130px" size="mini" class="danger-form">
				<el-form-item label="账号" prop="username" :rules="[{ required: true, message: '请输入账号' }]">
					<el-input v-model="form.username" placeholder="请输入账号" class="input-width margin-right"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码' }]">
					<el-input v-model="form.password" placeholder="请输入密码" class="input-width "></el-input>
				</el-form-item>
				<el-form-item style="width: 100%; text-align: center;">
					<el-button class="blue_btn" >登录</el-button>
					<el-button class="red_btn" >登录</el-button>
					<el-button class="yellow_btn" >登录</el-button>
					<el-button class="green_btn" >登录</el-button>
					<el-button class="gray_btn" >登录</el-button>
					<el-button type="danger" >登录</el-button>
					</el-form-item>
			</el-form>
		</el-row>
	</el-row>
</template>

<script>
import { mapState } from 'vuex';
import { applogin } from '@/api/login.js';
export default {
	name: 'login',
	computed: {
		...mapState(['userInfo'])
	},
	data() {
		return {
			form: {
				username: 'zhangwei',
				password: '123456'
			}
		};
	},
	methods: {
		submit(formName) {
			// 新增
			this.$refs[formName].validate(valid => {
				if (valid) {
					let params = '?username=' + this.form.username + '&password=' + this.form.password;
					applogin(params).then(res => {
						console.log(res);
						this.$message({
							type: 'success',
							message: '登录成功'
						});
						let data = res.data.data[0];
						let userInfo = {
							userid: data.userid,
							username: data.names,
							role: data.rolename,
							officeid: data.officeid,
							officename: data.officename,
							loginname: data.loginname
						};
						this.$store.commit('userInfo', userInfo);
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
	}
};
</script>

<style lang="stylus" scoped="scoped">
</style>
