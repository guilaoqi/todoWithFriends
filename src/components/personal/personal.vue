<template>
	<div>
		<div class="container">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" >
					<span class="mui-icon mui-icon-contact"></span> {{name}}
				</li>	
				<li class="mui-table-view-cell">
					<router-link class="mui-navigate-right" :to="{name:'password'}">
						修改密码
					</router-link>
				</li>
				<li class="mui-table-view-cell">
					<router-link class="mui-navigate-right" :to="{name:'partner'}">
						伙伴管理
							<span class="mui-badge" v-if="messageNum">{{messageNum}}</span>
					</router-link>
				</li>
			</ul>
			<mt-button type="primary" size="large" @click="logout">退出登录</mt-button>
		</div>
	</div>
</template>
<script>
	import connect from '../common/connect.js'
	export default({
		data(){
			return {
				name:'',
				messageNum:''
			}
		},
		methods:{
			logout(){
				this.$axios.get('logout')
				.then((response)=>{
					// console.log(response);
					if(response.data.state===1){
						// console.log("退出成功");
						window.localStorage.setItem("userdata",null);
						this.$router.push({name:'login'})
					}else if(response.data.state===0){
						this.$messagebox('错误');
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		},
		created() {
			connect.$on('phone',(msg)=>{
				this.messageNum=msg;
			});
			if(!JSON.parse(window.localStorage.getItem("userdata"))){
				this.$router.push({name:'login'});
				return
			};
			this.name=JSON.parse(window.localStorage.getItem("userdata")).username;
		}
	})
	
</script>
<style scoped>
	.container{
		padding-top:0;
	}
</style>