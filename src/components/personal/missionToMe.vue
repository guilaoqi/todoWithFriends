<template>
	<div>
		<mt-cell-swipe v-for="(value, key) in 10"
		:title="key+'    待接受任务'"
		:right="rightButtons"
		:left="leftButtons"
		>	
		<span>{{key}}</span>
	</mt-cell-swipe>
	</div>
</template>
<script>
	export default({
		data(){
			return{
				rightButtons:[],
				leftButtons:[]
			}
		},
		created(){
			this.rightButtons = [
			{          
				content: '拒绝',          
				style: { background: 'red', color: '#fff' },          
				handler: () => this.$messagebox('已删除')        
			}
			];
			this.leftButtons=[
			{          
				content: '接收',          
				style: { background: 'lightgray', color: '#fff' }       
			}
			];
		}
	})
</script>