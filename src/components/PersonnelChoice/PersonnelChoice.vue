<template>
	<el-dialog :title="title"  :visible.sync="dialogVisible" width="600px" @close="closeTree">
		<div class="tree">
			<el-row >
				<el-row style="border-bottom: 1px solid #ccc;padding-bottom: 10px;">				
					<div v-if="this.type">
						<el-col :span="4" style="line-height: 28px;text-align: center;">人员查询：</el-col>
						<el-col :span="18"><el-input v-model="data" size="mini" prefix-icon="el-icon-search" placeholder="请输入工号/名字" clearable></el-input></el-col>
					</div>				
				</el-row>
				<el-row class="tree1" style="min-height: 260px;" v-if="show">
					<div style="text-align: center;cursor: pointer;" v-for="(item, index) in nameData" :key="index" @mouseleave="activHide">
						<div style="padding: 5px;" @click="handelChoice(item)" @mouseenter="activShow(item.id)" :ref="item.id">{{ item.name }}</div>
					</div>
				</el-row>
			</el-row>
			<el-row v-if="!show" class="tree1"><el-tree :data="Persondata" :props="defaultProps" @node-click="handleNodeClick"></el-tree></el-row>
		</div>
	</el-dialog>
</template>

<script>
import { getBmRy ,findByIdOrName} from '@/api/utils.js';
export default {
	name: 'PersonnelChoice',//人员选择
	props:{
		type:{
			type:Number,// type 0 部门选择  type 1 人员选择
			default:1
		},
		Visible:{
			type:Boolean,
			default:false,
		}
	},
	data() {
		return {
			Persondata: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			},
			data: '', // 名字
			id: '', // 工号
			show: false,
			content: '搜索',
			nameData: [],
			dialogVisible:false,
		};
	},
	created() {
		if (this.type) {
			this.title = '人员选择';
		} else {
			this.title = '部门选择';
		}	
		this.getChoiceP({ type: this.type });
	},
	watch: {
		data() {
			if(this.data ==''){
				this.show = false
				return;
			}
			findByIdOrName({idOrName: this.data}).then(res => {
				console.log(res)
				this.nameData = res.data.data;
				this.show = true;
			});
		}
	},

	mounted() {},
	methods: {
		searchShow() {
			this.show = !this.show;
			this.content = this.content == '搜索' ? '隐藏搜索' : '搜索';
		},
		activHide() {
			for (var i = 0; i < this.nameData.length; i++) {
				let item = this.nameData[i];
				this.$refs[item.id][0].style.background = 'none';
				this.$refs[item.id][0].style.color = '#000';
			}
		},
		activShow(id) {
			// console.log(this.$refs[id])
			for (var i = 0; i < this.nameData.length; i++) {
				let item = this.nameData[i];
				this.$refs[item.id][0].style.background = 'none';
				this.$refs[item.id][0].style.color = '#000';
			}
			this.$refs[id][0].style.background = 'red';
			this.$refs[id][0].style.color = '#fff';
		},
		getChoiceP() {
			getBmRy().then(res=>{
				//console.log(res);
				this.Persondata = res.data.data;
				
				this.dialogVisible = this.Visible;	
				
			})
		},
		handelChoice(data) {
			let person = {
				id: data.id,
				name: data.name
			};
			this.$emit('personChoice', person);
			this.closeTree();
		},
		handleNodeClick(data) {		
			if (this.type) {
				if (data.isUser === 'Y') {
					// console.log(data);
					let person = {
						id: data.id_,
						name: data.name
					};
					this.$emit('personChoice', person);
					this.closeTree();
				}
			} else {
				let Org = {
					id: data.orgid,
					name: data.label
				};
				//console.log(Org);
				this.$emit('orgChoice', Org);
				this.closeTree();
			}
		},
		closeTree() {			
			this.$emit('closeTree', false);
		}
	}
};
</script>

<style scoped="scoped">
.tree {
	width: 500px;
	margin:0 auto;
	background: #fff;
}
.tree1 {
	padding-bottom: 10px;
	/* height:400px; */
	/* overflow: auto; */
}
.bg-purple-dark {
	background: #3892d3;
}
.bg-purple {
	background: #d3dce6;
}
.bg-purple-light {
	background: #e5e9f2;
}
.grid-content {
	/* border-radius: 4px; */
	min-height: 36px;
}
.pisk_title {
	line-height: 36px;
	font-size: 18px;
	color: #ffffff;
	font-weight: bold;
	padding-left: 30px;
}
</style>
