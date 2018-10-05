const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/mission');
mongoose.Promise=global.Promise;
var Schema=mongoose.Schema;
var missionSchema=new Schema({
	title:{
		type:String,
		required:true
	},
	detail:{
		type:String
	},
	user_name:{
		type:String,
		required:true
	},
	user_id:{
		type:String,
		required:true
	},
	add_time:{
		type:Date,
		required:true
	},
	finish_time:{
		type:Date
	},
	goal_time:{
		type:Date,
		required:true
	},
	to_user:{
		type:String,
		required:true
	},
	to_user_id:{
		type:String,
		required:true
	},
	mission_state:{
		type:String,
		required:true
	}
});

var mission=mongoose.model('mission',missionSchema);
module.exports=mission;



