<template>
	<div>
		<mt-navbar v-model="selected">
			<mt-tab-item id="1">我的工作</mt-tab-item>
			<mt-tab-item id="2">发布的工作</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<mt-cell-swipe v-for="(item, index) in missionToDo"
				:title="index+1+'.  '+item.title"
				:right="rightButtons(item._id)"
				:left="leftButtons(item._id)"
				:key="item._id"
				>

				<span class="mui-icon mui-icon-more" @click="toggleDetail" :data-id="item._id" :data-detail="item.detail" :data-title="item.title" :data-goaltime="item.goal_time" :data-addtime="item.add_time"></span>
				</mt-cell-swipe>
				<ul class="mui-table-view" v-if="missionToConfirm.length"> 
					<li :class="activeClassT?'mui-table-view-cell mui-collapse mui-active':'mui-table-view-cell mui-collapse'">
						<a class="mui-navigate-right" href="#" @click="toggleClassT">新任务
							<span class="mui-badge" v-if="missionToConfirm.length">{{missionToConfirm.length}}</span></span>
						</a>
						<div class="mui-collapse-content">
							<mt-cell v-for="(item,index) in missionToConfirm" :title="index+1+'.  '+item.title" :key="item._id" ><span style="margin-right:15px">from:{{item.user_name}}</span><mt-button type="primary" size="small" @click="confirm" :data-id="item._id">确认</mt-button></mt-cell>
						</div>
					</li>
				</ul>
				<ul class="mui-table-view"> 
					<li :class="activeClassD?'mui-table-view-cell mui-collapse mui-active':'mui-table-view-cell mui-collapse'">
						<a class="mui-navigate-right" href="#" @click="toggleClassD">已完成</a>
						<div class="mui-collapse-content">
							<mt-cell v-for="(item,index) in missionDone" :title="index+1+'.  '+item.title" :key="item._id" ><span class="mui-icon mui-icon-close" @click="todelete(item._id)"></span></mt-cell>
						</div>
					</li>
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<ul class="mui-table-view"> 
					<li :class="activeClass1?'mui-table-view-cell mui-collapse mui-active':'mui-table-view-cell mui-collapse'">
						<a class="mui-navigate-right" href="#" @click="toggleClass1">进行中</a>
						<div class="mui-collapse-content">
							<mt-cell v-for="(item,index) in missionOther1" :title="index+1+'.  '+item.title" :key="item._id">{{item.to_user}}<span class="mui-icon mui-icon-close" @click="todelete(item._id)"></span></mt-cell>
						</div>
					</li>
				</ul>
				<ul class="mui-table-view"> 
					<li :class="activeClass0?'mui-table-view-cell mui-collapse mui-active':'mui-table-view-cell mui-collapse'">
						<a class="mui-navigate-right" href="#" @click="toggleClass0">待接收</a>
						<div class="mui-collapse-content">
							<mt-cell v-for="(item,index) in missionOther0" :title="index+1+'.  '+item.title" :key="item._id">{{item.to_user}}<span class="mui-icon mui-icon-close" @click="todelete(item._id)"></span></mt-cell>
						</div>
					</li>
				</ul>
				<ul class="mui-table-view"> 
					<li :class="activeClass2?'mui-table-view-cell mui-collapse mui-active':'mui-table-view-cell mui-collapse'">
						<a class="mui-navigate-right" href="#" @click="toggleClass2">已完成</a>
						<div class="mui-collapse-content">
							<mt-cell v-for="(item,index) in missionOther2" :title="index+1+'.  '+item.title" :key="item._id">{{item.to_user}}<span class="mui-icon mui-icon-close" @click="todelete(item._id)"></span></mt-cell>
						</div>
					</li>
				</ul>
				
			</mt-tab-container-item>
		</mt-tab-container>
		<div class="mint-popup mint-popup-1" style=" z-index: 2001;" v-if="showDeatil"><h4>{{title}}</h4> <h5>备注:</h5><p>{{detail}}</p> <h5>时间:</h5><p>{{goal_time|format}}</p></div>
		<div class="v-modal" style="z-index: 2000;" v-if="showDeatil" @click="toggleDetail"></div>
	</div>
</template>
<script>
	import connect from "../common/connect.js"
	export default{
		data(){
			return{
				showDeatil:false,
				selected:"1",
				activeClass0:0,
				activeClass1:true,
				activeClass2:0,
				activeClassT:0,
				activeClassD:0,
				missionOther0:[],
				missionOther1:[],
				missionOther2:[],
				missionToConfirm:[],
				missionToDo:[],
				missionDone:[],
				title:'',
				detail:'',
				goal_time:'',
				add_time:'',

			}
		},
		created() { 
			if(!JSON.parse(window.localStorage.getItem("userdata"))){
				this.$router.push({name:'login'});
				return;
			}     
			var localId=JSON.parse(window.localStorage.getItem("userdata")).userid;
			this.$axios.get("mission/0")
			.then((response)=>{
				// console.log(response);
				this.missionOther0=response.data.filter(function(item){return item.to_user_id!=localId});
				// console.log(this.missionOther0);
			})
			.catch(function (error) {
				console.log(error);
			});  

			this.$axios.get("mission/1")
			.then((response)=>{
				// console.log(response);
				this.missionOther1=response.data.filter(function(item){return item.to_user_id!=localId});
			})
			.catch(function (error) {
				console.log(error);
			}); 

			this.$axios.get("mission/2")
			.then((response)=>{
				// console.log(response);
				this.missionOther2=response.data.filter(function(item){return item.to_user_id!=localId});
			})
			.catch(function (error) {
				console.log(error);
			});   
			this.$axios.get("mission/mine/toconfirm")
			.then((response)=>{
				// console.log(response);
				this.missionToConfirm=response.data;
				connect.$emit("message",response.data.length)
			});
			this.$axios.get("mission/mine/todo")
			.then((response)=>{
				// console.log(response);
				this.missionToDo=response.data;
			});
			this.$axios.get("mission/mine/done")
			.then((response)=>{
				// console.log(response);
				this.missionDone=response.data;
			})
			.catch(function (error) {
				console.log(error);
			});  
		},
		methods:{
			toggleDetail(e){
				// console.log(e.target.dataset.detail);
				this.title=e.target.dataset.title;
				this.detail=e.target.dataset.detail;
				this.goal_time=e.target.dataset.goaltime;
				this.add_time=e.target.dataset.addtime;
				this.showDeatil=!this.showDeatil;
			},
			rightButtons(id){
				// console.log(id);
				return [
				{          
					content: '删除',          
					style: { background: 'red', color: '#fff' },          
					handler:()=>{
						this.todelete(id);
					}        
				}
				]},
			leftButtons(id){
					return [
					{          
						content: '完成',          
						style: { background: 'blue', color: '#fff' },
						handler:()=>{
							// console.log(id);
							this.$axios.post('mission/edit', {
								mission_ID:id,
								mission_state:2
							})
							.then((response)=>{
								// console.log(response);
								if(response.data.state===1){
									this.$router.go(0);
								}
							})
							.catch(function (error) {
								console.log(error);
							});

						}      
					}
					]},
			todelete(id){
				this.$axios.post('mission/edit', {
					mission_ID:id,
					mission_state:3
				})
				.then((response)=>{
					if(response.data.state===1){
						this.$router.go(0);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			toggleClass0(){
				this.activeClass0=!this.activeClass0;
			},
			toggleClass1(){
				this.activeClass1=!this.activeClass1;
			},
			toggleClass2(){
				this.activeClass2=!this.activeClass2;
			},
			toggleClassT(){
				this.activeClassT=!this.activeClassT;
			},
			toggleClassD(){
				this.activeClassD=!this.activeClassD;
			},
			confirm(e){
				// console.log(e.target.dataset.id);
				this.$axios.post('mission/edit', {
					mission_ID:e.target.dataset.id,
					mission_state:1
				})
				.then((response)=>{
					// console.log(response);
					if(response.data.state===1){
						this.$router.go(0);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		}
	}
</script>
<style scoped>
 .mint-popup.mint-popup-1 {
    width: 300px;
    border-radius: 8px;
    padding: 10px;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);

}

.mint-popup {
    position: fixed;
    background: #fff;
    top: 35%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s ease-out;
    transition: .2s ease-out;
}
.v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
}
</style>
