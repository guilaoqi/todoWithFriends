const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/user');
mongoose.Promise=global.Promise;
var Schema=mongoose.Schema;
var userSchema=new Schema({
	name:{
		type:String,
		required:true
	},
	phonenum:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	friendlist:{type:[
		{name: String, id: {type:String,sparse:true},phonenum:String}
	],default: undefined},
	newfriends:{type:[
		{name: String, id: {type:String,sparse:true},phonenum:String}
	],default: undefined},
	waitfriends:{type:[
		{name: String, id: {type:String,sparse:true},phonenum:String}
	],default: undefined},
	
});

var user=mongoose.model('user',userSchema);
module.exports=user;



