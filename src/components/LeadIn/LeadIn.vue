<template>
	<div style="margin-top: 100px;margin-bottom: 100px;">
		<div class="import-left">
			<div style="margin: 0 auto; font-size:25px;color: #fff;width: 40px;height: 40px;border-radius: 50%;background-color: #3b98e0;">1</div>
			<div style="color: #79799d;">{{ tipsLeft }}</div>
			<div style="line-height: 30px;"><el-button size="mini" type="primary" @click="handelDownload">下载模板</el-button></div>
		</div>
		<div class="import-right">
			<div style="margin: 0 auto; font-size:25px;color: #fff;width: 40px;height: 40px;border-radius: 50%;background-color: #3b98e0;">2</div>
			<div style="color: #79799d;">{{ tipsRight }}</div>
			<div>
				<el-upload
					class="upload-demo"
					ref="unpload"
					:data="{ userId: userInfo.userid, userName: userInfo.username }"
					:action="actionUrl"
					:before-upload="beforeUploadVideo"
					:on-success="handleSuccess"
					:limit="1"
					:on-exceed="handleExceed"
					:show-file-list="true"
					:name="fileName"
				>
					<el-button size="mini" type="primary">选择文件</el-button>
				</el-upload>
			</div>
		</div>
		<div style="clear: both;"></div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'LeadIn',
	computed: {
		...mapState(['userInfo'])
	},
	props: {
		tipsLeft: {
			//左边提示信息
			type: String,
			default: ''
		},
		tipsRight: {
			// 右边提示信息
			type: String,
			default: ''
		},
		downloadUrl: {
			//下载模板url
			type: String,
			default: ''
		},
		actionUrl: {
			type: String, //批量上传 url
			default: ''
		},
		fileName: {
			type: String //文件名
		}
	},
	mounted() {
		console.log(this.actionUrl);
		console.log(this.downloadUrl);
		console.log(this.fileName);
	},
	data() {
		return {};
	},
	methods: {
		// 下载模板
		handelDownload() {
			let link = document.createElement('a');
			link.setAttribute('href', this.downloadUrl);
			link.click();
		},
		close() {
			this.$emit('close', false);
		},
		handleExceed(files, fileList) {
			// this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		},
		//上传前回调
		beforeUploadVideo(file) {
			// console.log(file)
			if (['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].indexOf(file.type) == -1) {
				this.$message({
					showClose: true,
					message: '请上传正确的格式',
					type: 'error'
				});
				return false;
			}
			this.isShowUploadVideo = false;
		},
		// 请求成功
		handleSuccess(response, file, fileList) {
			this.$refs.unpload.clearFiles();
			console.log(response);
			if (response.code == 200) {
				this.$message({
					type: 'success',
					message: response.message
				});
				this.close();
			} else {
				this.$message.error(response.message);
			}
		}
	}
};
</script>

<style scoped="scoped">
.import-left {
	width: 50%;
	height: 180px;
	box-sizing: border-box;
	float: left;
	text-align: center;
	border-right: 1px #ccc dashed;
	line-height: 40px;
}
.import-right {
	float: left;
	width: 50%;
	height: 180px;
	box-sizing: 50%;
	text-align: center;
	line-height: 40px;
}
</style>
