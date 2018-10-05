<template>
	<div>
		<div class="container">
			<div class="form_box" name="lt_form">
				<div class="mui-input-row">
					<input name="old_pass" type="password" placeholder="原密码" class="mui-input-password" data-input-password="1" v-model="passpre">
					<span class="mui-icon mui-icon-eye"></span>
				</div>
				<div class="mui-input-row">
					<input name="new_pass" type="password" placeholder="新密码" class="mui-input-password" data-input-password="2" v-model="passnew">
					<span class="mui-icon mui-icon-eye"></span>
				</div>
				<div class="mui-input-row">
					<input name="confirm_pass" type="password" placeholder="确认新密码" class="mui-input-password" data-input-password="3" v-model="passcon">
					<span class="mui-icon mui-icon-eye"></span>
				</div>
				<mt-button type="primary" size="large" @click="passChange">确认修改</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
	export default({
		data(){
			return {
				passpre:'',
				passnew:'',
				passcon:''
			}
		},
		methods:{
			passChange(){
				if(!this.passpre.trim()){
					this.$messagebox('请输入原始密码');
					return;
				}
				if(!this.passnew.trim()){
					this.$messagebox('新密码不能为空');
					return;
				}
				if(!this.passcon.trim()){
					this.$messagebox('请确认新密码');
					return;
				}
				if(this.passcon.trim()!=this.passnew.trim()){
					this.$messagebox('新密码两次输入不一致');
					return;
				}
				this.$axios.post('UpdatePass',{
					passpre:this.passpre,
					passnew:this.passnew
				}).then((response)=>{
					// console.log(response);
					if(response.data.state===1){
						this.$messagebox('密码修改成功');
						window.localStorage.setItem("userdata",null);
						this.$router.push({name:'login'});
					}else if(response.data.state===0){
						this.$messagebox('原密码输入错误');
					}
				}).catch(function (error) {
					console.log(error);
				});
			}
		}
	})
	
</script>
<style scoped>
	.container {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 20px 10px 50px 10px;
    background: #fff;
}
</style>