<template>
	<div>
	<mt-header  title="ToList"><mt-button icon="back" slot="left" @click='back'>返回</mt-button></mt-header>
	<router-view class="content"></router-view>
			<nav class="mui-bar mui-bar-tab " >
				<router-link class="mui-tab-item" :to="{name:'home'}">
					<span class="mui-icon mui-icon-home"><span class="mui-badge" v-if="messageNum2">{{messageNum2}}</span></span>
					<span class="mui-tab-label">首页</span>
				</router-link>
				<router-link class="mui-tab-item" :to="{name:'addMission'}">
				<span class="mui-icon mui-icon-plus"></span>
				<span class="mui-tab-label">添加任务</span>
				</router-link>
				<router-link class="mui-tab-item" :to="{name:'personal'}">
				<span class="mui-icon mui-icon-contact"><span class="mui-badge" v-if="messageNum">{{messageNum}}</span></span>
				<span class="mui-tab-label">个人中心</span>
				</router-link>
			</nav>					
	</div>
</template>
<script >
	import connect from './components/common/connect.js'
	export default({
		data(){
			return {
				messageNum:'',
				messageNum2:""
			}
		},
		methods:{
			back(){
				this.$router.go(-1);
			}
		},
		created(){
			connect.$on('phone',(msg)=>{
				this.messageNum=msg;
			})
			connect.$on('message',(msg)=>{
				this.messageNum2=msg;
			})
		}
	})
	
</script>
<style scoped>
	.content{
		margin-top:40px;
	}
</style>