<template>
	<div>
	<mt-switch v-model="value"></mt-switch>	
	<mt-field label="用户名" placeholder="请输入用户名" v-model="username" v-if="!value"></mt-field>
	<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone" v-if="value"></mt-field>
	<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
	<mt-button type="primary" @click="login" size="large" class="mybutton">确认</mt-button>
	<span style="float:right;margin:20px;color:#666" @click="register" >注册</span>
	</div>
</template>
<script>
	export default({
		data(){
			return{
				value:false,
				username:'',
				password:'',
				phone:''
			}
		},
		methods:{
			login(){
				this.$axios.post('login',{
					username:this.username,
					password:this.password,
					phonenum:this.phone,
					value:this.value
				}).then((response)=>{
					// console.log(response);
					if(response.data.state===1){
						// console.log("登录成功")
						window.localStorage.setItem("userdata",JSON.stringify(response.data));
						this.$router.push({name:'home'})
					}else if(response.data.state===0){
						this.$messagebox('用户或密码错误');
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			register(){
				this.$router.push({name:'register'});
			}
		}
	})
	
</script>
<style scoped>
	.mybutton{
		margin-top:15px;
	}
</style>