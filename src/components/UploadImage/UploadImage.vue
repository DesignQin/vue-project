<template>
	<div>
		<ul class="download-imgs">
			<li class="need-enclosure clearfix" v-for="(item, index) in imagelist" :key="index">
				<img class="preview-img" :src="item.url" style="position:relative" />
				<div class="img-hover">
					<div class="preview ">
						<span class="el-icon-zoom-in btn" @click="showImg(item.url)"></span>
						<span class="el-icon-delete btn" @click="deleteImg(index)" v-if="isShow"></span>
					</div>
				</div>
			</li>
		</ul>
		<el-upload
			v-if="isShowUpload && !progressShow"
			class="moc-upload"
			drag
			refs="photo"
			:on-success="handlePhotoSuccess"
			:on-progress="uploadProcess"
			:on-error="handlePhotoError"
			:before-upload="beforeUploadPhoto"
			:on-change="onUploadChange"
			:multiple="false"
			:auto-upload="!false"
			:show-file-list="false"
			name="file"
			:action="url"
			:file-list="imagelist"
		>
			<div>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">
					将图片拖到此处，或
					<em>点击上传</em>
					<br />
					只支持上传 image/jpeg 、image/png 格式
				</div>
			</div>
		</el-upload>
		<el-progress v-if="progressShow" type="circle" :percentage="percent" color="#409eff"></el-progress>
		<!--点击图片放大dialog-->
		<el-dialog :visible.sync="dialogImg"><img width="100%" :src="imgExpand" alt="" /></el-dialog>
	</div>
</template>

<script>
export default {
	name: 'videoUpload',
	props: {
		imagelist: {
			type: Array
		},
		isShow: {
			type: Boolean		
		},
		imageName: {
			type: String,
			default: 'imagelist'
		}
	},
	data() {
		return {
			url: '',//上传地址
			progressShow: false,//显示进度条
			percent: 0,//进度
			dialogImg: false,// 开启预览
			imgExpand: '',//预览图片路径
			isShowUpload:false,//是否开启图片上传
		};
	},
	created() {
		this.url = IPCONFIG + '/gao/uploadflv/upload';		
		this.isShowUpload = this.isShow
	},
	watch:{
		isShow(v){
			this.isShowUpload = this.isShow
		}
	},
	mounted() {},
	filters: {
		formatName(cellvalue) {
			//console.log(cellvalue)
			if (cellvalue.length > 9) {
				let index = cellvalue.lastIndexOf('\/');
				let demandName = cellvalue.substring(index + 1, cellvalue.length);
				return demandName;
			} else {
				return cellvalue;
			}
		}
	},
	methods: {
		deleteImg(index) {
			//删除图片
			this.imagelist.splice(index, 1);
			if (this.imagelist.length < 3) {
				this.isShowUpload = true;
			}
			this.$emit('success', this.imageName);
		},
		uploadProcess(event, file, fileList) {
			this.progressShow = true;
			this.percent = file.percentage.toFixed(0) * 1;
		},
		//预览执行结果的图片
		showImg(url) {
			this.imgExpand = url;
			this.dialogImg = true;
		},

		onUploadChange(file, fileList) {
			// console.log(file.type);
			// 文件改变时触发
			// this.progressShow = true;
		},
		//上传前回调
		beforeUploadPhoto(file) {
			// console.log(file);
			var fileSize = file.size / 1024 / 1024 <= 1;
			if (['image/jpeg', 'image/png'].indexOf(file.type) == -1) {
				this.$message.error('只支持上传 image/jpeg 、image/png 格式');
				return false;
			}
			if (!fileSize) {
				this.$message.error('文件大小不能超过1MB');
				return false;
			}
			//this.imagelist.push(file);
		},
		//上传成功回调
		handlePhotoSuccess(res, file, fileList) {
			console.log(res);
			// return;
			this.progressShow = false;
			if (res.code == 200) {
				let img = {
					url: IPCONFIG + '/gao/uploadflv/' + res.data.fileid,
					filename: res.data.filefullname,
					attid: res.data.fileid
				};
				this.imagelist.push(img);
				if (this.imagelist.length >= 3) {
					this.isShowUpload = false;
				}
				// console.log(this.imagelist)
				this.$emit('success', this.imageName);
			} else {
				this.$message.error('图片上传失败，请联系管理员');
			}
		},
		handlePhotoError(res, file, fileList) {
			this.$message.error('图片上传失败，请稍后再试');
		},
		handleRemove(file) {
			// 删除图片 需要向后台发请求
			this.$emit('removePhoto');
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleDownload(file) {
			console.log(file);
		}
	}
};
</script>

<style lang="less">
.moc-upload {
	.el-upload-dragger {
		background-color: #fff;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 250px;
		height: 125px;
		text-align: center;
		position: relative;
		overflow: hidden;
		.el-upload__text {
			color: #606266;
			font-size: 12px;
			text-align: center;
		}
		.el-icon-upload {
			font-size: 39px;
			color: #c0c4cc;
			margin: 0;
			line-height: 58px;
		}
	}
}
.disabled .el-upload--picture-card {
	display: none;
}
.download-imgs {
}
.need-enclosure {
	display: inline-block;
	width: 140px;
	margin-bottom: 10px;
	position: relative;
}

.need-enclosure p {
	/* 文件名过长后显示省略号 */
	width: 250px;
	font-size: 12px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	position: relative;
	top: -5px;
}
.preview {
	width: 100%;
	height: 100%;
	text-align: center;
	line-height: 80px;
	color: #fff;
	font-size: 15px;
	.btn {
		cursor: pointer;
		margin: 0 5px;
	}
}

.preview-img {
	width: 120px;
	height: 80px;
	display: inline-block;
}
.natural-img {
	display: inline-block;
	width: 120px;
	height: 80px;
}
.need-enclosure:hover .img-hover {
	display: block;
}
.img-hover {
	width: 120px;
	height: 80px;
	background: rgba(29, 29, 30, 0.7);
	position: absolute;
	top: 0;
	left: 0;
	display: none;
}
</style>
