<template>
	<div class="container">
		<mt-field label="标题" placeholder="请输入任务标题" v-model="title"></mt-field>
		<mt-field label="备注" placeholder="备注" type="textarea" rows="4" v-model="detail"></mt-field>
		<mt-field label="日期" placeholder="请输入日期" type="date" v-model="date"></mt-field>
		<div class="mint-cell-wrapper mint-field">
			<div class="mint-cell-title"><!----> 
				<span class="mint-cell-text">分配</span> 
			</div> 
			<div class="mint-cell-value" @click="toggle">
				<input placeholder="请点击选择" type="text" class="mint-field-core" v-model="person"> 
				<div class="mint-field-clear" style="display: none;">
					<i class="mintui mintui-field-error"></i>
				</div> 
				<span class="mint-field-state is-default">
					<i class="mintui mintui-field-default"></i></span> 
					<div class="mint-field-other">	
					</div>
				</div> 
			</div>
		<mt-button type="primary" size="large" @click="confirm">确认</mt-button>
		<mt-popup v-model="popupVisible" position="bottom" class="popup">
			<mt-button type="primary" @click="toggle" size="large">确认</mt-button>
			<mt-picker :slots="slots" @change="onValuesChange" ></mt-picker>
		</mt-popup>
		
	</div>
</template>
<script>
	export default{
		data(){
			return{
				popupVisible:false,
				date:'',
				title:'',
				detail:"",
				person:"",
				person_id:"",
				userdata:{},
				slots: [
				{
					flex: 1,
					values: ["自己"],
					className: 'slot1',
					textAlign: 'center'
				}
				]
			}
		},
		created() {
			if(!JSON.parse(window.localStorage.getItem("userdata"))){
				this.$router.push({name:'login'});
				return;
			}        
			var userdata=JSON.parse(window.localStorage.getItem("userdata"));
			this.userdata=userdata;
			// console.log("-------");
			// console.log(userdata);
			userdata.friendlist.forEach((item,index)=>{
				// console.log(item.name);
				this.slots[0].values.push(item.name+'-'+item.phonenum);
			})
			
		},
		methods: {
			onValuesChange(picker, values) {
				if (values[0] > values[1]) {
					picker.setSlotValue(1, values[0]);
				}
				// console.log(picker);
				// console.log(values);
				this.person=values[0];
				// this.popupVisible=false;
			},
			toggle(){
				this.popupVisible=!this.popupVisible;
				var index=this.slots[0].values.indexOf(this.person);
				// console.log(index);

				this.person_id=index>0?this.userdata.friendlist[index-1].id:null;
				// console.log("朋友的id"+this.person_id);
			},

			confirm(){
				var that=this;
				this.$axios.post('mission', {
					title:this.title,
					detail:this.detail,
					add_time:new Date(),
					goal_time:this.date,
					to_user:this.person,
					to_user_id:this.person_id
				})
				.then(function (response) {
					// console.log(response);
					if(response.data.state===1){
						that.$messagebox('添加成功');
						that.title='';
						that.detail="";
						that.date="";
						that.person="";

					}
				})
				.catch(function (error) {
					console.log(error);
				});
			},


		},
	}
</script>
<style scoped>
.container{
	padding-top:20px;
}
.popup{
	width:100%;
	padding:10px;
}
</style>
