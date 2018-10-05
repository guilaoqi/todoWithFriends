<template>
	<div>
	<mt-field label="用户名" placeholder="请输入用户名" v-model="username" class="first" ></mt-field>
	<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
	<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
	<mt-button type="primary" @click="regist" size="large">注册</mt-button>
	</div>
</template>
<script>
	export default({
		data(){
			return{
				username:'',
				password:'',
				phone:''
			}
		},
		methods:{
			regist(){
				if(!this.username.trim()){
					this.$messagebox('用户名不能为空');
					return;
				};
				if(!this.password.trim()){
					this.$messagebox('密码不能为空');
					return;
				};

				if(!(/^1[3|4|5|8]\d{9}$/.test(this.phone))){
					this.$messagebox('手机号格式不正确');
					return;
				};
				this.$axios.post('user/add',{
					username:this.username,
					password:this.password,
					phonenum:this.phone
				}).then((response)=>{
					// console.log(response);
					if(response.data.state===1){
						this.$messagebox('注册成功');
					}else if(response.data.state===0){
						this.$messagebox('该手机号已注册');
					}else if(response.data.state===-1){
						this.$messagebox('用户名已注册');
					}
				}).catch(function (error) {
					console.log(error);
				});
			}
		}
	})
	
</script>
<style scoped>
	.first{
		padding-top:20px;
	}
</style>