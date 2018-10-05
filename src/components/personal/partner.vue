<template>
	<div >
		<mt-cell-swipe v-for="(item, key) in friendlist"
		:title="key+1+item.name"
		:right="rightButtons"
		>
		</mt-cell-swipe>
		<ul class="mui-table-view"> 
			<li :class="activeClass?'mui-table-view-cell mui-collapse mui-active':'mui-table-view-cell mui-collapse'">
				<a class="mui-navigate-right" href="#" @click="toggleClass" v-if="partnerToConfirm.length">好友请求
				<span class="mui-badge">{{partnerToConfirm.length}}</span>
				</a>
				<div class="mui-collapse-content">
					<mt-cell v-for="(item,index) in partnerToConfirm" :title="index+1+'.  '+item.name" :key="item.id" ><mt-button type="primary" size="small" @click="confirm" :data-id="item.id">接受</mt-button></mt-cell>
				</div>
			</li>
		</ul>

		<mt-button type="primary" @click="toadd" size="large">添加伙伴</mt-button>
	</div>
</template>
<script>
	import connect from '../common/connect.js'
	export default({
		data(){
			return {
				partnerToConfirm:[],
				activeClass:0,
				rightButtons:[],
				result:[],
				friendlist:[]
			}
		},
		methods:{
			toadd(){
				this.$router.push({name:"partneradd"});
			},
			toggleClass(){
				this.activeClass=!this.activeClass;
			},
			confirm(e){
				// console.log(e.target.dataset.id);
				this.$axios.post('confirmRequest',{userid:e.target.dataset.id})
				.then((response)=>{
					// console.log(response);
					if(response.data.state===1){
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
			this.rightButtons = [
			{          
				content: '删除',          
				style: { background: 'red', color: '#fff' },          
				handler: () => this.$messagebox('假的已删除，功能待增加')        
			}
			];
			var userdata=JSON.parse(window.localStorage.getItem("userdata"));
			// console.log(userdata);
			this.partnerToConfirm=userdata.newfriends;
			connect.$emit('phone',userdata.newfriends.length)
			this.friendlist=userdata.friendlist;

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