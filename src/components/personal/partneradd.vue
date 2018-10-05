<template>
	<div >
		<mt-search
		v-model="value"
		cancel-text="取消"
		placeholder="请输入对方电话搜索" @keyup.enter.native="submit">
			<mt-cell
    		v-for="item in result"
    		:title="item.username"
    		:value="item.value">
    		<span class="mui-icon mui-icon-plus" :data-id="item.userid" :data-username="item.username" @click="Toadd" v-if="show"></span>
  			</mt-cell>
		</mt-search>
	</div>
</template>
<script>
	export default({
		data(){
			return {
				show:true,
				rightButtons:[],
				value:'',
				result:[],
				userdata:{},
				friendlistId:[],
				newfriends:[],
				waitfriendsId:[]
			}
		},
		methods:{
			submit(){
				var res=[];
				this.$axios.post('searchUser',{phonenum:this.value})
				.then((response)=>{
					// console.log(response);
					if(response.data.state===1){
						if(response.data.userid==this.userdata.userid){
							this.$messagebox('这是你自己号码');
							return
						};
						if(this.friendlistId.indexOf(response.data.userid)!=-1){
							this.$messagebox(response.data.username+'-已经是你的好友了');
							return
						};
						if(this.newfriends.indexOf(response.data.userid)!=-1){
							this.$messagebox(response.data.username+'-该好友已经向您发送好友申请,前往新朋友进行接收');
							return
						};
						if(this.waitfriendsId.indexOf(response.data.userid)!=-1){
							this.$messagebox(response.data.username+'-您已经向该好友发送过申请了，请耐心等待');
							return
						};
						this.result=[{username:response.data.username,value:response.data.phonenum,userid:response.data.userid}];
						this.show=true;
					}else if(response.data.state===0){
						this.show=false;
						this.result=[{username:"该用户不存在，请重新搜索",value:null}]
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			Toadd(e){
				// console.log(e.target.dataset.id)
				this.$axios.post('sendRequest',{userid:e.target.dataset.id,username:e.target.dataset.username})
				.then((response)=>{
					// console.log(response);
					if(response.data.state===1){
						this.$messagebox('添加请求已发送');
						return this.$axios.get('update')
					}
				})
				.then((response)=>{
					window.localStorage.setItem("userdata",JSON.stringify(response.data));
					this.$router.go(0);
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		},
		created() {      
			if(!JSON.parse(window.localStorage.getItem("userdata"))){
				this.$router.push({name:'login'});
				return;
			}   
			var userdata=JSON.parse(window.localStorage.getItem("userdata"));
			// console.log(userdata);
			this.userdata=userdata;
			userdata.friendlist.forEach((item,index)=>{
				this.friendlistId.push(item.id)
			});
			userdata.newfriends.forEach((item,index)=>{
				this.newfriendsId.push(item.id)
			});
			userdata.waitfriends.forEach((item,index)=>{
				this.waitfriendsId.push(item.id)
			});
		}
	})
	
</script>
<style>
	.container {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 55px 10px 50px 10px;
    background: #fff;
}
</style>



